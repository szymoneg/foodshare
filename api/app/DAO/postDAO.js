import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

import PostModel from '../model/postModel';
import * as _ from 'lodash';

async function getAll(){
    const result = await PostModel.find();
    if(result){
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.NOT_FOUND, 'Post not found');
}

export default{
    getAll: getAll,
};