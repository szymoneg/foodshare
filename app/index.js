import Hapi from '@hapi/hapi';
import Blipp from 'blipp';
import config from './config';
import Good from 'good';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import bluebird from 'bluebird';
import mongoose from 'mongoose';
import routes from './rest/routes';
import Vision from 'vision';

mongoose.Promise = bluebird;
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useCreateIndex: true }, (error) => {
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
    })
})

const start = async () => {

    const server = new Hapi.server({
        port: config.port
    });

    const swaggerOptions = {
        info: {
            title: 'FOODSHARE_API',
            version: '21.37'
        }
    };

    await server.register([
        Blipp,
        Inert,
        Vision,
        {
            plugin: require('hapi-cors'),
            option: {
                origins: ['http://localhost:4200'],
                methods: ['POST, GET, PATCH, PUT, DELETE'],
                headers: ['Accept', 'Content-Type', 'Authorization']
            }
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions 
        }
    ]);

    server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
          auth: false
        },
        handler: {
          file: 'public/index.html'
        }
    });

    try {
        await routes.secureRoutes(server);
        await routes.register(server);
        await server.start();
        console.info(`Server is listening on ${config.port}`);
    } catch(err){
        console.error(err);
    }
};

start();