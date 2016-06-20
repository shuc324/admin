/**
 * Created by shuc on 16/6/20.
 */
"use strict";

import service from "./service";
import helper from "../utils/helper";
import status from "../responses/status";
import AdminModel from "../../models/admin_model";

export default class extends service {

    // 用户cookie键名
    USER_COOKIE_KEY = "user_id";
    USER_COOKIE_KEY_SALT = "okh63b";
    USER_COOKIE_EXPIRE_TIME = 7200;

    /**
     * private
     * 检查用户名格式
     * @param username
     * @returns {*}
     */
    check_username(username) {
        return AdminModel.where({username: username}).countAsync().then(count => {
            return !count && /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(username);
        });
    }

    /**
     * private
     * 检查密码格式
     * @param password
     * @returns {*}
     */
    check_password(password) {
        return /^(?=.{6,16}$)(?![0-9]+$)[\w!@#$%^&*()-_+=]+$/.test(password);
    }

    /**
     * @public
     * 注册
     */
    sign_up = (request, response) => {
        let username = request.body.username || "";
        let password = request.body.password || "";

        this.check_username(username).then(ligical_username => {
            let ligical_password = this.check_password(password);

            switch (true) {
                case !ligical_username :
                    // todo 更详细的提示信息
                    response.json(status.failure());
                    break;
                case !ligical_password:
                    // todo 更详细的提示信息
                    response.json(status.failure());
                    break;
                case ligical_username && ligical_password:
                    let salt = helper.range_str();
                    let data = {
                        username: username,
                        password: helper.encrypt(password, salt),
                        salt    : salt
                    };
                    (new AdminModel(data)).save();
                    response.json(status.success());
                    break;
                default :
                    response.json(status.failure());
            }
        }).catch(err => {
            response.json(status.error());
        });
    };

    /**
     * @public
     * 登录
     */
    sign_in = (request, response) => {
        let username = request.body.username || "";
        let password = request.body.password || "";

        AdminModel.findOne({username: username}, "password salt").execAsync().then(user => {
            switch (true) {
                case !user:
                    response.json(status.out('USER_NOT_EXISTS'));
                    break;
                case helper.encrypt(password, user.salt) == user.password:
                    // 设置cookie todo 似乎好像没效果
                    response.cookie(this.USER_COOKIE_KEY, helper.encrypt_encode(user._id, this.USER_COOKIE_KEY_SALT, {
                        maxAge  : this.USER_COOKIE_EXPIRE_TIME,
                        httpOnly: true
                    }));
                    response.json(status.success());
                    break;
                case helper.encrypt(password, user.salt) != user.password:
                    response.json(status.out('PASSWORD_ERROR'));
                    break;
                default :
                    response.json(status.failure());
            }
        }).catch(err => {
            response.json(status.error());
        });
    };

    /**
     * 退出
     * todo ...
     */
    sign_out = () => {

    };
}