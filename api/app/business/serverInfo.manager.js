import serverInfoDAO from '../DAO/serverInfoDAO'

function getInfo(request){

   async function getLogs(request){
       return await serverInfoDAO.getLogs(request)
   }

    return{
        getLogs: getLogs
    }
}

export default{
    create: getInfo
}