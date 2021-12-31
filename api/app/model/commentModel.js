import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const commentSchema = new Schema({
    comment: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createDate: { type: mongoose.Schema.Types.Date, default: new Date() }
},{
    collection: 'comment'
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema, 'comment');
