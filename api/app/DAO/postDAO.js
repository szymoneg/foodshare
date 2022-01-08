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
    const { payload } = request;
    const post = await PostModel.findOne({_id: payload.post})
    const lickedBy = await UserModel.findOne({username: payload.username})

    console.log(lickedBy._id)

    if (post.likes.includes(lickedBy._id)){
        throw applicationException.new(applicationException.ERROR, 'Post already licked by this user')
    }
    await PostModel.updateOne({_id: payload.post}, {
        $push: {likes: lickedBy._id},
    });
    return "ok"
}

async function removeLick(request) {
    const { payload } = request;
    const post = await PostModel.findOne({_id: payload.post})
    const lickedBy = await UserModel.findOne({username: payload.username})

    if (post.likes.includes(lickedBy._id)){
        await PostModel.updateOne({_id: payload.post}, {
            $pull: {likes: lickedBy._id},
        });
        return "ok"
    }
    throw applicationException.new(applicationException.ERROR, 'This user dont licked this post yet')
}

async function getUserPost(request){
    const {username} = request;

    const user = await UserModel.findOne({username: username})
    const post = await PostModel.find({user: user._id}).populate({
        path: 'user',
        select: 'username email'
    })
    if (post){
        return post;
    }
    throw applicationException.new(applicationException.ERROR, 'Dont find any posts')
}


export default {
    getAll: getAll,
    getPost: getPost,
    createPost: createPost,
    deletePost: deletePost,
    addLick: addLick,
    removeLick: removeLick,
    getUserPost: getUserPost
};