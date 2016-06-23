/**
 * Created by shuc on 16/6/23.
 */
import service from "./service";
import helper from "../utils/helper";
import status from "../responses/status";
import UserModel from "../../models/user_model";

export default class extends service {

    add = (request, response) => {
        let time = Date.now();
        let name = request.body.name || '';
        let parent_id = request.body.parent_id || '';
        let level = parseInt(request.body.level) || '';
    };

    /**
     * @public
     * 群组列表
     */
    list = (request, response) => {

    };
}