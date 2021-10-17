import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const postSchema = new Schema({
    description: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', require: true, unique: true },
    content: {type: String, require: true }
},{
    collection: 'post'
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema, 'post');