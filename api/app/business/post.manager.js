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

    async function deleteComment(request){
        return await commentDAO.deleteComment(request);
    }

    async function deletePost(request){
        return await  postDAO.deletePost(request);
    }

    async function addLick(request){
        return await postDAO.addLick(request);
    }

    async function removeLick(request){
        return await postDAO.removeLick(request)
    }

    async function getUserPost(request){
        return await postDAO.getUserPost(request)
    }

    return{
        getAll: getAll,
        getPost: getPost,
        createPost: createPost,
        addComment: addComment,
        deleteComment: deleteComment,
        deletePost: deletePost,
        addLick: addLick,
        removeLick: removeLick,
        getUserPost: getUserPost
    }
}

export default{
    create: create
}