import subjectManager from './post.manager';
import userManager from './user.manager';

function getContext(request) {
    return { user: request && request.user };
}

function getter(manager) {
    return (request) => manager.create(getContext(request));
}

export default{
    getUserManager: getter(userManager),
    getPostManager: getter(subjectManager)
}