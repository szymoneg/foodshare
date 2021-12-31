import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userRole = {
    admin: 'admin',
    user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new Schema(
    {
        email: {type: String, required: true, unique: true},
        username: {type: String, required: true, unique: true},
        name: {type: String, required: false},
        surname: {type: String, required: false},
        role: {
            type: String,
            enum: userRoles,
            default: userRole.user,
            required: false
        },
        active: {type: Boolean, default: false, required: false},
        isAdmin: {type: Boolean, default: false, required: false},
        activationHash: {type: String, required: true}
    },
    {
        collection: 'user'
    }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema, 'user');
