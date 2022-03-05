const fs = require('fs')

async function getLogs(request){
    let text = fs.readFileSync('../api/logs/logs.log');

    let newArr = text.toString().split(/\r\n|\r|\n/);
    newArr.pop()

    let json = newArr.map(element => JSON.parse(element))

    return json;
}

async function editUser(request){

}

export default {
    getLogs: getLogs,
    editUser: editUser
}
