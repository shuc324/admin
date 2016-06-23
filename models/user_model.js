/**
 * Created by shuc on 16/6/20.
 */
import Model from "./_mongo_model";

class UserModel extends Model {

    schema() {
        return new this.Schema({
            username   : String,
            password   : String,
            // 是否是已认证的管理员
            auth_status: {type: Number, default: 0},
            group_id   : {type: Number, default: 0},
            full_name  : {type: String, default: ''},
            salt       : {type: String, default: ''}
        });
    }
}

export default new UserModel();