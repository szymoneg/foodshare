import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import UserModel from '../model/userModel'
import PostModel from '../model/postModel'

import * as _ from 'lodash';
import { upload } from '../service/upload'
const fs = require('fs')
const inert = require('@hapi/inert')

async function getAll(request){
    let pageSize = request.page

    const result = PostModel.find()
        .limit(pageSize)

    if(result){
        return result;
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Post not found');
}

async function createPost(request) {
    if(request){
        const { payload } = request;
        const pathToImage = `./app/uploads/${+ new Date()}.png`;
        const data = payload.file._data;
        const user = await UserModel.findOne({ email: payload.email });

        fs.writeFile(pathToImage, data, err => {
            if(err){
                console.log(err)
            }
            return "ok";
        })

        let newPost = upload(pathToImage).then(response => {
            fs.unlink(pathToImage, (err) => {
                if(err){
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

export default{
    getAll: getAll,
    createPost: createPost,
};