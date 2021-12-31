import applicationException from "../service/applicationException";
import mongoConverter from "../service/mongoConverter";
import UserModel from "../model/userModel";
import PostModel from "../model/postModel";
import CommentModel from "../model/commentModel";

import * as _ from "lodash";
import {upload} from "../service/upload";

const fs = require("fs");
const inert = require("@hapi/inert");

async function addComment(request) {
    if (request) {
        const {payload} = request;
        const user = await UserModel.findOne({username: payload.username});
        const post = await PostModel.findOne({_id: payload.post});

        if (user && post) {
            const newComment = {
                user: user,
                comment: payload.comment,
                post: post,
            };

            const comment = new CommentModel(newComment).save().then(async (result) => {
                await PostModel.findByIdAndUpdate({_id: post._id}, {
                    $push: {comments: result._id},
                });
                return result;
            });
        }
        return payload;
    } else {
        return "empty";
    }
}

export default {
    addComment: addComment,
};
