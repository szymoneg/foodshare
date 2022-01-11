import Hapi from 'hapi';
import Blipp from 'blipp';
import config from './config';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import bluebird from 'bluebird';
import mongoose, {models} from 'mongoose';
import routes from './rest/routes';
import Vision from 'vision';

mongoose.Promise = bluebird;
mongoose.connect(config.databaseUrl, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Connect with database established');
    }
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.error('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

const server = new Hapi.server({
    port: config.port,
    host: 'localhost',
    'routes': {
        'cors': true
    }
});

const swaggerOptions = {
    info: {
        title: 'Foodshare - API',
        version: '1.0'
    }
};
//
// server.route({
//     method: 'GET',
//     path: '/{param*}',
//     config: {
//         auth: false
//     },
//     handler: {
//         file: 'public/index.html'
//     }
// });

const start = async () => {
    await server.register([
        Blipp,
        Inert,
        Vision,
        {
            plugin: require('hapi-cors'),
            options: {
                origins: ['http://localhost:4200/api'],
                methods: ['POST, GET, PATCH, PUT, DELETE'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            }
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    server.start();
    await routes.secureRoutes(server);
    await routes.register(server);
    console.info(`Server is listening on ${config.port}`);
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

start();

module.exports = server;
