/**
 * Created by shuc on 16/6/20.
 */
"use strict";

import service from "./service";
import helper from "../utils/helper";
import status from "../responses/status";
import AdminModel from "../../models/admin_model";

export default class extends service {

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
     * public
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
        });
    };

    /**
     * 登录
     * todo ...
     */
    sign_in = () => {

    };

    /**
     * 退出
     * todo ...
     */
    sign_out = () => {

    };
}