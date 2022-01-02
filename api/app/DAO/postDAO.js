import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import UserModel from '../model/userModel'
import PostModel from '../model/postModel'

import {upload} from '../service/upload'

const fs = require('fs')
const inert = require('@hapi/inert')

async function getAll(request) {
    let pageSize = request.page

    const result = PostModel.find()
        .populate({
            path: 'user',
            select: 'username email'
        })
        .populate([{
            path: 'comments',
            select: 'comment',
            populate: {
                path: 'user',
                select: 'username email'
            }
        }])
    if (result) {
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Post not found');
}

async function getPost(request) {
    const {id} = request;

    const post = PostModel.findOne({_id: id})
        .populate({
            path: 'user',
            select: 'username email'
        })
        .populate([{
            path: 'comments',
            select: 'comment',
            populate: {
                path: 'user',
                select: 'username email'
            }
        }])

    if (post){
        return post;
    }

    throw applicationException.new(applicationException.NOT_FOUND, "post not found")
}

async function createPost(request) {
    if (request) {
        const {payload} = request;
        const pathToImage = `./app/uploads/${+new Date()}.png`;
        const data = payload.file._data;
        const user = await UserModel.findOne({email: payload.email});

        fs.writeFile(pathToImage, data, err => {
            if (err) {
                console.log(err)
            }
            return "ok";
        })

        let newPost = upload(pathToImage).then(response => {
            fs.unlink(pathToImage, (err) => {
                if (err) {
                    console.log(err);
                }
            })

            const newPost = {
                user: user,
                description: payload.description,
                img: response
            }

            return new PostModel(newPost).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        });

        return newPost;
    }

    throw applicationException.new(applicationException.ERROR, 'Cannot create new post');
}

async function deletePost(request) {
    if (request) {
        const {payload} = request;

        const postToDelete = await PostModel.findOne({_id: payload.id}).populate({
            path: 'user',
            select: 'username email'
        })

        if (postToDelete) {
            if (postToDelete.user.username === payload.username) {
                await PostModel.deleteOne({_id: payload.id})
                return "ok"
            } else {
                throw applicationException.new(applicationException.FORBIDDEN, 'Wrong user')
            }
        } else {
            throw applicationException.new(applicationException.NOT_FOUND, 'Cannot find post')
        }

    }
    throw applicationException.new(applicationException.ERROR, 'Cannot delete post')
}

async function addLick(request) {

}

async function removeLick(request) {

}


export default {
    getAll: getAll,
    getPost: getPost,
    createPost: createPost,
    deletePost: deletePost
};