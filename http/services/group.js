/**
 * Created by shuc on 16/6/23.
 */
import service from "./service";
import mongoose from "mongoose";
import helper from "../utils/helper";
import status from "../responses/status";
import logger from "../../library/logger";
import GroupModel from "../../models/group_model";

export default class extends service {

    /**
     * @public
     * 新增群组
     */
    add = (request, response) => {
        let name = request.body.name || '';
        let parent_id = request.body.parent_id || '';
        let level = parseInt(request.body.level) || 0;

        let group = {
            name        : name,
            level       : level,
            created_time: Date.now()
        };

        if (helper.object_id(parent_id)) {
            group.parent_id = new mongoose.Types.ObjectId(parent_id);
        }

        GroupModel.count({name: name}).execAsync()
            .then(count => {
                if (count > 0) {
                    response.json(status.failure());
                } else {
                    (new GroupModel(group)).save(err => {
                        if (err) {
                            response.json(status.error());
                        } else {
                            response.json(status.success());
                        }
                    });
                }
            })
            .catch(err => {
                logger.error(err.toString());
                response.json(status.error());
            });
    };

    /**
     * @public
     * 编辑群组
     */
    edit = (request, response) => {
        let id = request.body.id || '';
        let name = request.body.name || '';
        let parent_id = request.body.parent_id || '';

        let update = {};
        if (name != '') {
            update.name = name;
        }
        if (helper.object_id(parent_id)) {
            update.parent_id = new mongoose.Types.ObjectId(parent_id);
        }

        if (update && id) {
            GroupModel.update({_id: new mongoose.Types.ObjectId(id)}, {$set: update}).execAsync()
                .then(res => {
                    if (res.ok > 0) {
                        response.json(status.success());
                    } else {
                        response.json(status.failure());
                    }
                })
                .catch(err => {
                    logger.error(err.toString());
                    response.json(status.error());
                });
        } else {
            response.json(status.failure());
        }
    };

    /**
     * @public
     * 群组列表
     */
    list = (request, response) => {

        GroupModel.find({}, "name parent_id level").sort("-created_time").execAsync()
            .then(groups => {
                let list = groups.map((group) => {
                    return {
                        id    : group._id,
                        parent: group.parent_id,
                        text  : group.name,
                        state : {
                            opened: true
                        }
                    };
                });
                // todo ... 取得用户
                response.json(status.success(list));
            })
            .catch(err => {
                logger.error(err.toString());
                response.json(status.error());
            });

    };
}