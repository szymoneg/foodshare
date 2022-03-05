const server = require('../app/index.js')
const postSchema = require('../app/model/postModel')
import userSchema from '../app/model/userModel'
import userDAO from "../app/DAO/userDAO";
import postDAO from "../app/DAO/postDAO";
import applicationException from '../app/service/applicationException';
import { emailValidator } from "../app/service/inputValidator";

test('should fail in get all users, where token is missing', async function () {
    const options = {
        method: 'GET',
        url: '/api/user/all',
    };
    const data = await server.inject(options);
    expect(data.statusCode).toBe(401);
})

test('should return OK, during return list all posts', async function () {
    const options = {
        method: 'POST',
        url: '/api/post/get-all',
        payload: {
            page: 2
        }
    };
    const data = await server.inject(options);
    await expect(data.statusCode).toBe(200);
})

test('should return user', async function () {

    const expectedUser = {
        "_id": "61c5bb18bce3013de2f15cbf",
        "email": "szymoneg@mail.com",
        "username": "szymoneg",
        "role": "user",
        "active": false,
        "isAdmin": false,
        "activationHash": "627c06b79e65002d3cc7d650aad97896698227d9",
        "__v": 0
    }

    userSchema.findOne = jest.fn().mockReturnValueOnce(expectedUser)
    userSchema.prototype.save = jest.fn().mockImplementation(() => {
    })

    const user = await userDAO.getUserByUsername("szymoneg")

    expect(user).toEqual(expectedUser)
})

test('should return error, if username already exist', async function () {
    postSchema.findOne = jest.fn().mockReturnValueOnce()
    postSchema.prototype.save = jest.fn().mockImplementation(() => {
    })

    await expect(postDAO.getPost({
        "id": "61c5be64bce3013de2f15cd0",
    })).rejects.toStrictEqual(applicationException.new(applicationException.NOT_FOUND, 'post not found'))
})

test('should return ok, if user deleted', async function () {
    postSchema.findOne = jest.fn().mockReturnValueOnce({
            _id: "61dde497c20384b7d737bf50",
            user:{
                username: "szymon"
            },
            populate: () => { return {
                _id: "61dde497c20384b7d737bf50",
                user:{
                    username: "szymon"
                }
            }}
        }
    )
    postSchema.deleteOne = jest.fn().mockImplementation(() => {})

    await expect(postDAO.deletePost({
        payload: {
            "id": "61dde497c20384b7d737bf50",
            "username": "szymon"
        }
    })).resolves.toBe("ok")
})

test('should return error, if username already lick the same post', async function () {
    postSchema.findOne = jest.fn().mockReturnValueOnce({
        likes: ['61a7f228ff0ebed3f7678f32']
    })
    userSchema.findOne = jest.fn().mockReturnValueOnce({
        _id: "61a7f228ff0ebed3f7678f32",
        username: 'szymon'
    })

    await expect(postDAO.addLick({payload: {
            "post": "61ddeb8b53e0ec9cb8b3a7b7",
            "username": "szymon"
        }
    })).rejects.toStrictEqual(applicationException.new(applicationException.ERROR, 'Post already licked by this user'))
})

test('should return error, email is wrong', async function () {
    expect(emailValidator('szymon@gmail.com')).toBe(true)
})





