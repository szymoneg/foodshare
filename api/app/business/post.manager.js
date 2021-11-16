import postDAO from "../DAO/postDAO";

function create(request){
    
    async function getAll(request) {
        return await postDAO.getAll(request);
    }

    async function createPost(request) {
        return await postDAO.createPost(request);
    }

    return{
        getAll: getAll,
        createPost: createPost,
    }
}

export default{
    create: create
}