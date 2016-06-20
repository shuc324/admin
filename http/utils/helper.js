/**
 * Created by shuc on 16/6/20.
 */
"use strict";

import crypto from "crypto";

export default class helper {

    // 随机字符串
    static range_str = (str_len) => {
        let str = Math.random().toString(36).substr(2);
        return str_len && str_len <= 16 ? str.substr(0, str_len) : str.substr(0, 6);
    };

    // md5加密
    static str_md5 = (str) => {
        let md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    };

    // 加盐加密
    static encrypt = (str, salt) => {
        return helper.str_md5(helper.str_md5(str) + salt);
    };

    static encrypt_encode = (str, salt) => {

        return str;
    };
}