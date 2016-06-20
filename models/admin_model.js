/**
 * Created by shuc on 16/6/20.
 */
import MongoModel from "./mongo_model";

class AdminModel extends MongoModel {

    schema() {
        return new this.Schema({
            username   : String,
            password   : String,
            salt       : {type: String, default: ''},
            // 是否是已认证的管理员
            auth_status: {type: Number, default: 0},
        });
    }
}

export default new AdminModel();