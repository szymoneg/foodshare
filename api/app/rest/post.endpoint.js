import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const postEndpoint = {
    register(server) {
        server.route({
            method: 'GET',
            path: '/api/posts',
            options: {
                description: 'Get all books',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async(request, h) => {
                try{
                    return await business.getPostManager(request).getAll();
                }catch(error){
                    return applicationException.errorHandler(error, h);
                }
            }
        });
    }
}

export default postEndpoint;