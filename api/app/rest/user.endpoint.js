import applicationException from '../service/applicationException';
import business from '../business/business.container';
import validator from './requestValidator';
const log4js = require('log4js')

log4js.configure({
  appenders: { 'file': { type: 'file', filename: 'logs/logs.log' } },
  categories: { default: { appenders: ['file'], level: 'debug' } }
});
const logger = log4js.getLogger("cheese");
logger.level = 'debug'


const userEndpoint = {
  register(server) {
    server.route({
      method: 'POST',
      path: '/api/user/auth',
      options: {
        description: 'Authenticate user',
        tags: ['api'],
        validate: {
          payload: validator.authenticate.payload
        },
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).authenticate(request.payload.login, request.payload.password);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/api/user/create',
      options: {
        description: 'Create or update user',
        tags: ['api'],
        validate: {
          payload: validator.createOrUpdateUser.payload
        },
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).createNewOrUpdate(request.payload);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/all',
      options: {
        description: 'Get all users',
        tags: ['api'],
        validate: {},
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).getAllUsers();
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/user/remove/{id}',
      options: {
        description: 'Remove user',
        tags: ['api'],
        validate: {
          params: validator.removeById.params
        },
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).removeUserById(request.params.id);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'DELETE',
      path: '/api/user/logout/{userId}',
      options: {
        description: 'Logout user',
        tags: ['api'],
        validate: {
          params: validator.removeById.params
        },
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).removeHashSession(request.params.userId);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/activate/{hash}',
      options: {
        description: 'Activate user',
        tags: ['api'],
        validate: {
        },
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).activateUser(request.params.hash);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/{id}/generate/file',
      options: {
        description: 'Generate file about user',
        tags: ['api'],
        validate: {
          params: validator.activation.params
        },
        auth: false
      },
      handler: async (request, h) => {
        try {
          return await business.getUserManager(request).activateUser(request.params.hash);
        } catch (error) {
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/email/{email}',
      options: {
        description: 'Check email availability',
        tags: ['api'],
        validate: {},
        auth: false
      },
      handler: async (request, h) => {
        try {
          return business.getUserManager(request).checkEmailAvailability(request.params.email);
        } catch (err) {
          return applicationException.errorHandler(err, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/id/{id}',
      options: {
        description: 'Get user by id',
        tags: ['api'],
        validate: {},
        auth: 'bearer'
      },
      handler: async (request, h) => {
        try {
          return business.getUserManager(request).getUserById(request.params.id);
        } catch (err) {
          return applicationException.errorHandler(err, h);
        }
      }
    });

    server.route({
      method: 'PUT',
      path: '/api/user/update-user',
      options: {
        description: 'Update user data',
        tags: ['api'],
        validate: {
        },
        auth: false
      },
      handler: async(request, h) => {
        try{
          logger.info("Update user data")
          return await business.getUserManager(request).updateUser(request);
        }catch(error){
          logger.error("Update user data - error" + error)
          return applicationException.errorHandler(error, h);
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/api/user/get-username/{username}',
      options: {
        description: 'Get user by username',
        tags: ['api'],
        validate: {},
        auth: false
      },
      handler: async (request, h) => {
        try {
          return business.getUserManager(request).getUserByUsername(request.params.username);
        } catch (err) {
          return applicationException.errorHandler(err, h);
        }
      }
    });


  },
  tag: {
    name: 'user',
    description: 'When somebody login, signin or create user'
  }
};

export default userEndpoint;
