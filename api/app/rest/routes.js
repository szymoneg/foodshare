import hapiAuthBearerToken from 'hapi-auth-bearer-token';
import business from '../business/business.container';
import userEndpoint from './user.endpoint';
import postEndpoint from './post.endpoint';
import serverInfoEndpoint from "./serverInfo.endpoint";

const routes = {
    async secureRoutes(server) {
        await server.register(hapiAuthBearerToken);
        server.auth.strategy('bearer', 'bearer-access-token', {
            allowQueryToken: true,
            validate: async (request, token, h) => {
                let isValid;
                try {
                    const user = await business.getUserManager().getUserByToken(token);
                    isValid = !!user;
                } catch (e) {
                    isValid = false;
                    console.error('Token is not valid!')
                }

                const credentials = {token};
                const artifacts = {test: 'info'};

                return {isValid, credentials, artifacts};
            }
        });
        server.auth.default('bearer');
    },
    register(server) {
        userEndpoint.register(server);
        postEndpoint.register(server);
        serverInfoEndpoint.register(server);
    },
    tags() {
        return [
            userEndpoint.tag,
            postEndpoint.tag,
            serverInfoEndpoint.tag
        ];
    }
};

export default routes;
