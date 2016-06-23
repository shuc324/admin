/**
 * Created by shuc on 16/6/20.
 */
"use strict";

import crypto from "crypto";
import underscore from "underscore";

let DEFAULTS = {
    encoding  : {
        input : 'utf8',
        output: 'hex'
    },
    algorithms: ['bf', 'blowfish', 'aes-128-cbc']
};

function MixCrypto(options) {
    if (typeof options == 'string')
        options = {key: options};

    options = underscore.extend({}, DEFAULTS, options);
    this.key = options.key;
    this.inputEncoding = options.encoding.input;
    this.outputEncoding = options.encoding.output;
    this.algorithms = options.algorithms;
}

MixCrypto.prototype.encrypt = function (plaintext) {
    return underscore.reduce(this.algorithms, function (memo, a) {
        var cipher = crypto.createCipher(a, this.key);
        return cipher.update(memo, this.inputEncoding, this.outputEncoding) + cipher.final(this.outputEncoding)
    }, plaintext, this);
};

MixCrypto.prototype.decrypt = function (crypted) {
    try {
        return underscore.reduceRight(this.algorithms, function (memo, a) {
            var decipher = crypto.createDecipher(a, this.key);
            return decipher.update(memo, this.outputEncoding, this.inputEncoding)
                + decipher.final(this.inputEncoding);
        }, crypted, this);
    } catch (e) {
        return "";
    }
};

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
    static md5_encrypt = (str, salt) => {
        return helper.str_md5(helper.str_md5(str) + salt);
    };

    // 加密
    static encrypt = (str, salt) => {
        return (new MixCrypto(salt)).encrypt(str.toString());
    };

    // 解密
    static decrypt = (str, salt) => {
        return (new MixCrypto(salt)).decrypt(str.toString());
    };
}