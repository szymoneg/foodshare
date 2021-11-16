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
                description: 'Get all books',
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

        // server.route({
        //     method: 'GET',
        //     path: '/api/post/{id}'
        // })
    }
}

export default postEndpoint;