/**
 * Created by shuc on 16/6/20.
 */
"use strict";

import service from "./service";
import helper from "../utils/helper";
import status from "../responses/status";
import logger from "../../library/logger";
import UserModel from "../../models/user_model";

export default class extends service {

    // 用户cookie键名
    USER_COOKIE_KEY = "user_token";
    USER_COOKIE_KEY_SALT = "okh63b";
    USER_COOKIE_EXPIRE_TIME = 7200;

    USER_DEFAULT_AVATAR = "assets/img/app/profile/Nasta.png";

    /**
     * private
     * 检查用户名格式
     * @param username
     * @returns {*}
     */
    check_username(username) {
        return UserModel.where({username: username}).countAsync().then(count => {
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
        let full_name = request.body.full_name || "";
        let avatar = request.body.avatar || this.USER_DEFAULT_AVATAR;

        this.check_username(username).then(ligical_username => {
            let ligical_password = this.check_password(password);

            switch (true) {
                case !ligical_username :
                    response.json(status.out('USERNAME_ERROR'));
                    break;
                case !ligical_password:
                    response.json(status.out('PASSWORD_ERROR'));
                    break;
                case ligical_username && ligical_password:
                    let salt = helper.range_str();
                    let user = {
                        username    : username,
                        password    : helper.md5_encrypt(password, salt),
                        full_name   : full_name,
                        avatar      : avatar,
                        salt        : salt,
                        created_time: Date.now()
                    };
                    (new UserModel(user)).save();
                    response.json(status.success());
                    break;
                default :
                    response.json(status.failure());
            }
        }).catch(err => {
            logger.error(err.toString());
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

        UserModel.findOne({username: username}, "password salt").execAsync().then(user => {
            switch (true) {
                case !user:
                    response.json(status.out('USER_NOT_EXISTS'));
                    break;
                case helper.md5_encrypt(password, user.salt) == user.password:
                    // 设置cookie
                    response.cookie(this.USER_COOKIE_KEY, helper.encrypt(user._id, this.USER_COOKIE_KEY_SALT, {
                        maxAge  : this.USER_COOKIE_EXPIRE_TIME,
                        httpOnly: true
                    }));
                    response.json(status.success());
                    break;
                case helper.md5_encrypt(password, user.salt) != user.password:
                    response.json(status.out('PASSWORD_ERROR'));
                    break;
                default :
                    response.json(status.failure());
            }
        }).catch(err => {
            logger.error(err.toString());
            response.json(status.error());
        });
    };

    /**
     * @public
     * 退出
     */
    sign_out = (request, response) => {
        response.clearCookie(this.USER_COOKIE_KEY);
        return status.success();
    };

    /**
     * @public
     * 成员列表
     */
    list = (request, response) => {
        // todo ... 权限检验
        let start = parseInt(request.body.start) || 0;
        let limit = parseInt(request.body.limit) || 15;

        UserModel.count().execAsync()
            .then(count => {
                UserModel.find({}, "username full_name avatar group auth_status").sort("-created_time").skip(start).limit(limit).execAsync()
                    .then(users => {
                        let res = {
                            start: start + users.length,
                            total: count,
                            list : users
                        };
                        response.json(status.success(res));
                    }).catch(err => {
                        logger.error(err.toString());
                        response.json(status.error());
                    });
            }).catch(err => {
                logger.error(err.toString());
                response.json(status.error());
            });
    };
}