import commentDAO from "../DAO/commentDAO";
import postDAO from "../DAO/postDAO";

function create(request){
    
    async function getAll(request) {
        return await postDAO.getAll(request);
    }

    async function createPost(request) {
        return await postDAO.createPost(request);
    }

    async function addComment(request) {
        return await commentDAO.addComment(request);
    }

    return{
        getAll: getAll,
        createPost: createPost,
        addComment: addComment
    }
}

export default{
    create: create
}