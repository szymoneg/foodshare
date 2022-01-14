import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';

const fs = require('fs')

const serverInfoEndpoint = {
    register(server) {
        server.route({
            method: 'GET',
            path: '/api/admin/logs',
            options: {
                description: 'Get logs',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async (request, h) => {
                try {
                    return await business.getServerManager(request).getLogs(request.payload);
                } catch (error) {
                    return applicationException.errorHandler(error, h);
                }
            }
        });

        server.route({
            method: 'POST',
            path: '/api/admin/edit-user',
            options: {
                description: 'Edit user - admin',
                tags: ['api'],
                validate: {},
                auth: false
            },
            handler: async (request, h) => {
                try {
                    return await business.getServerManager(request).editUser(request.payload);
                } catch (error) {
                    return applicationException.errorHandler(error, h);
                }
            }
        });
    },
    tag: {
        name: 'serverInfo',
        description: 'Server infos, logs files etc.'
    }

}

export default serverInfoEndpoint;