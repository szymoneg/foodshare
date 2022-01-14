import serverInfoDAO from '../DAO/serverInfoDAO'

function getInfo(request){

   async function getLogs(request){
       return await serverInfoDAO.getLogs(request)
   }

   async function editUser(request){
       return await serverInfoDAO.editUser(request)
   }

    return{
        getLogs: getLogs,
        editUser: editUser
    }
}

export default{
    create: getInfo
}