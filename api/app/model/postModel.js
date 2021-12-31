import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const postSchema = new Schema({
    description: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    img: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createDate: {type: mongoose.Schema.Types.Date, default: new Date()}
},{
    collection: 'post'
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Post', postSchema, 'post');
