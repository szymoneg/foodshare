import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';
const fs = require('fs')

const postEndpoint = {
    register(server) {
        server.route({
            method: 'POST',
            path: '/api/posts',
            options: {
                description: 'Get all posts',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async(request, h) => {
                try{
                    return await business.getPostManager(request).getAll(request.payload);
                }catch(error){
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/post',
            options: {
                payload: {
                    output: 'stream',
                    parse: true,
                    allow: 'multipart/form-data'
                },
                description: 'Create new post',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    return await business.getPostManager(request).createPost(request);
                }catch(error){
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/comment',
            options: {
                description: 'Create new comment',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    return await business.getPostManager(request).addComment(request);
                }catch(error){
                    return applicationException.errorHandler(error, h);
                }
            }
        });
    }
}

export default postEndpoint;