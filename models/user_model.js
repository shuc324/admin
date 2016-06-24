/**
 * Created by shuc on 16/6/20.
 */
import Model from "./_mongo_model";

class UserModel extends Model {

    schema() {
        return new this.Schema({
            username     : String,
            password     : String,
            // 是否是已认证的管理员
            auth_status  : {
                type   : Number,
                default: 0
            },
            group        : {
                id       : this.Schema.ObjectId,
                name     : {
                    type   : String,
                    default: ''
                },
                parent_id: this.Schema.ObjectId
            },
            full_name    : {
                type   : String,
                default: ''
            },
            avatar       : {
                type   : String,
                default: ''
            },
            salt         : {
                type   : String,
                default: ''
            },
            created_time : Date,
            modified_time: {
                type   : Date,
                default: Date.now
            }
        });
    }
}

export default new UserModel();