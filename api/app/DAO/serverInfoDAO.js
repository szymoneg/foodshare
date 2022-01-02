const fs = require('fs')

async function getLogs(request){
    let text = fs.readFileSync('../api/logs/logs.log').toString('utf-8');

    // let logsArr = text.replace(/\\/g,"").split("\n");
    // logsArr.map(i => i.replace(/\\/g, ""))
    return text;
}

export default {
    getLogs: getLogs
}