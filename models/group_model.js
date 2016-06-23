/**
 * Created by shuc on 16/6/23.
 */
import Model from "./_mongo_model";

class GroupModel extends Model {

    schema() {
        return new this.Schema({
            name     : String,
            parent_id: this.Schema.ObjectId,
            level    : {type: Number, default: 0}
        });
    }
}

export default new GroupModel();