import UserModel from "../model/userModel";
import PostModel from "../model/postModel";
import CommentModel from "../model/commentModel";
import applicationException from "../service/applicationException";

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

async function deleteComment(request){
    if (request){
        const { payload } = request;
        const user = await UserModel.findOne({username: payload.username});
        const comment = await CommentModel.findOne({_id: payload.comment}).populate({
            path: 'user',
            select: 'username'
        });

        if (user && comment){
            if (comment.user.username === payload.username){
                await PostModel.findByIdAndUpdate({_id: payload.post}, {
                    $pull: {comments: payload.comment},
                });
                await CommentModel.deleteOne({_id: payload.comment})
                return "ok"
            }else{
                throw applicationException.new(applicationException.FORBIDDEN, 'Wrong user')
            }
        }else{
            throw applicationException.new(applicationException.NOT_FOUND, 'Cannot find comment or post')
        }
    }
    throw applicationException.new(applicationException.ERROR, 'Cannot delete post')
}

export default {
    addComment: addComment,
    deleteComment: deleteComment
};
