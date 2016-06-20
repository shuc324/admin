/**
 * Created by shuc on 16/6/20.
 */

class status {

    SUCCESS = 200;

    FAILED = -200;

    SYSTEM_ERROR = -400;

    USER_NOT_EXISTS = -10000;
    PASSWORD_ERROR = -10010;

    message = {
        SUCCESS        : "success",
        FAILURE        : "failure",
        SYSTEM_ERROR   : "system error",
        USER_NOT_EXISTS: "user not exists",
        PASSWORD_ERROR : "password error"
    };

    out(state, data, message) {
        let code = Reflect.get(this, state) || this.FAILED;
        return {
            code   : code,
            data   : data ? data : {},
            message: message || (Reflect.has(this.message, state) ? Reflect.get(this.message, state) : this.message.FAILURE)
        };
    }

    success(data) {
        return this.out('SUCCESS', data);
    }

    failure(data) {
        return this.out('FAILURE', data);
    }

    error() {
        return this.out('SYSTEM_ERROR');
    }
}

export default new status();