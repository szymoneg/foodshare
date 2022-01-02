import commentDAO from "../DAO/commentDAO";
import postDAO from "../DAO/postDAO";

function create(request){
    
    async function getAll(request) {
        return await postDAO.getAll(request);
    }

    async function getPost(request){
        return await  postDAO.getPost(request)
    }

    async function createPost(request) {
        return await postDAO.createPost(request);
    }

    async function addComment(request) {
        return await commentDAO.addComment(request);
    }

    async function deletePost(request){
        return await  postDAO.deletePost(request);
    }

    return{
        getAll: getAll,
        getPost: getPost,
        createPost: createPost,
        addComment: addComment,
        deletePost: deletePost
    }
}

export default{
    create: create
}