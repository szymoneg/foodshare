const fs = require('fs')

async function getLogs(request){
    let text = fs.readFileSync('../api/logs/logs.log');

    return JSON.parse(text);
}

async function editUser(request){

}

export default {
    getLogs: getLogs,
    editUser: editUser
}