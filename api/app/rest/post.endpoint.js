import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';
const fs = require('fs')
const log4js = require('log4js')

log4js.configure({
    appenders: { 'file': { type: 'file', filename: 'logs/logs.log' } },
    categories: { default: { appenders: ['file'], level: 'debug' } }
});
const logger = log4js.getLogger("cheese");
logger.level = 'debug'

const postEndpoint = {
    register(server) {
        server.route({
            method: 'POST',
            path: '/api/post/get-all',
            options: {
                description: 'Get all posts',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Get all posts")
                    return await business.getPostManager(request).getAll(request.payload);
                }catch(error){
                    logger.error("Get all post - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/api/post/details/{id}',
            options: {
                description: 'Get single posts',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Get details posts")
                    return await business.getPostManager(request).getPost(request.params);
                }catch(error){
                    logger.error("Get details post - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/post/create',
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
                    logger.info("Create new post")
                    return await business.getPostManager(request).createPost(request);
                }catch(error){
                    logger.error("Create new post - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/post/create-comment',
            options: {
                description: 'Create new comment',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Create new comment")
                    return await business.getPostManager(request).addComment(request);
                }catch(error){
                    logger.error("Create new comment - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/post/delete',
            options: {
                description: 'Delete post',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Delete post")
                    return await business.getPostManager(request).deletePost(request);
                }catch(error){
                    logger.info("Delete post - error: " + error)
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/api/post/delete-comment',
            options: {
                description: 'Delete comment',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Delete comment")
                    return await business.getPostManager(request).deleteComment(request);
                }catch(error){
                    logger.info("Delete comment - error: " + error)
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/post/add-lick',
            options: {
                description: 'Add lick',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Add lick")
                    return await business.getPostManager(request).addLick(request);
                }catch(error){
                    logger.error("Add lick - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/post/remove-lick',
            options: {
                description: 'Remove lick',
                tags: ['api'],
                validate: {
                },
                auth: false
            },
            handler: async(request, h) => {
                try{
                    logger.info("Remove lick")
                    return await business.getPostManager(request).removeLick(request);
                }catch(error){
                    logger.error("Remove lick - error")
                    return applicationException.errorHandler(error, h);
                }
            }
        });

    }
}

export default postEndpoint;