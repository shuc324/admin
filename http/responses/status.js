/**
 * Created by shuc on 16/6/20.
 */

class status {

    SUCCESS = 200;

    FAILED = -200;

    message = {
        SUCCESS: "success",
        FAILURE: "failure"
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
}

export default new status();