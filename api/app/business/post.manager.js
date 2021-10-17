import postDAO from "../DAO/postDAO";

function create(context){
    async function getAll() {
        return await postDAO.getAll();
    }

    return{
        getAll: getAll,
    }
}

export default{
    create: create
}