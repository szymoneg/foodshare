import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';
import Promise from 'bluebird';
import * as _ from 'lodash';
import UserModel from '../model/userModel';
require('dotenv').config()

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_SENDER_MAIL,
    pass: process.env.MAIL_SENDER_PASSWORD
  }
});

function createNewOrUpdate(user) {
  return Promise.resolve().then(() => {
    if (!user.id) {
      return new UserModel(user).save().then(result => {
        if (result) {
          console.log(result)
          let mailOptions = {
            from: process.env.MAIL_SENDER_MAIL,
            to: user.email,
            subject: 'Rejestracja w systemie Foodshare',
            html: `<h4>Witaj ${user.username} w Foodshare!</h4> <br> Link do aktywacji konta https://localhost:3003/api/user/activate/${result.activationHash}`
          }

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              throw applicationException.new(applicationException.BAD_REQUEST, err.message);
            } else {

            }
          })
          return mongoConverter(result);
        }
      });
    } else {
      return UserModel.findByIdAndUpdate(user.id, _.omit(user, 'id'), { new: true });
    }
  }).catch(error => {
    if ('ValidationError' === error.name) {
      error = error.errors[Object.keys(error.errors)[0]];
      throw applicationException.new(applicationException.BAD_REQUEST, error.message);
    }
    throw error;
  });
}

async function getByEmail(name) {
  const result = await UserModel.findOne({ email: name });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getUserByActivationHash(hash) {
  const user = await UserModel.findOne({ activationHash: hash });
  if (user) {
    return mongoConverter(user);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function get(id) {
  const result = await UserModel.findOne({ _id: id });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

async function getAllUsers() {
  const result = await UserModel.find({});
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'Users not found');
}

async function removeById(id) {
  return await UserModel.findByIdAndRemove(id);
}

async function checkAvailability() {
  const data = await UserModel.find();
  if (data) {
    return mongoConverter(data);
  }
}

async function updateUser(request){
  const { payload } = request;
  const user = UserModel.findOne({username: payload.username});
  if (user){
    await UserModel.updateOne({username: payload.username},{
      name: payload.name,
      surname: payload.surname,
      email: payload.email
    })
    return "ok"
  }else{
    throw applicationException.new(applicationException.NOT_FOUND, 'Users not found');
  }
}

async function getUserByUsername(username){
  const result = await UserModel.findOne({ username: username });
  if (result) {
    return mongoConverter(result);
  }
  throw applicationException.new(applicationException.NOT_FOUND, 'User not found');
}

export default {
  createNewOrUpdate: createNewOrUpdate,
  getByEmail: getByEmail,
  getUserByActivationHash: getUserByActivationHash,
  get: get,
  getAllUsers: getAllUsers,
  removeById: removeById,
  checkAvailability: checkAvailability,
  updateUser: updateUser,
  getUserByUsername: getUserByUsername,
};
