require('dotenv').config()
const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose");
const Joi = require("joi");

Mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const PersonModel = Mongoose.model("person", {
    firstname: String,
    lastname: String
});

const init = async () =>{

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: "POST",
        path: "/person",
        options: {
            validate: {
                payload: Joi.object({
                    firstname: Joi.string().required(),
                    lastname: Joi.string().required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover()
                }
            }
        },
        handler: async (request, h) => {
            try{
                var person = new PersonModel(request.payload)
                var result = await person.save()
                return h.response(result)
            } catch(error){
                return h.response(error).code(500)
            }
        }
    });
    
    server.route({
        method: "GET",
        path: "/people",
        handler: async (request, h) => {
            try{
                var person = await PersonModel.find().exec()
                return h.response(person)
            }catch(error){
                return h.response(error).code(500)
            }
        }
    });
    
    server.route({
        method: "GET",
        path: "/person/{id}",
        handler: async (request, h) => {
            try{
                var person = await PersonModel.findById(request.params.id).exec()
                return h.response(person)
            }catch(error){
                return h.response(error).code(500)
            }
        }
    });
    
    server.route({
        method: "PUT",
        path: "/person/{id}",
        options: {
            validate: {
                payload: Joi.object({
                    firstname: Joi.string().optional(),
                    lastname: Joi.string().optional()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ? h.response(error.details[0]).takeover() : h.response(error).takeover()
                }
            }
        },
        handler: async (request, h) => {
            try {
                var result = await PersonModel.findByIdAndUpdate(request.params.id, request.payload, {new: true})
                return h.response(result)
            } catch (error) {
                return h.response(error).code(500)
            }
        }
    });
    
    server.route({
        method: "DELETE",
        path: "/person/{id}",
        handler: async (request, h) => {
            try {
                var reslt = await PersonModel.findByIdAndDelete(request.params.id)
                return h.response(result)
            } catch (error) {
                return h.response(error).code(500)
            }
        }
    });

    server.start();
    console.log('Server running on %s', server.info.uri);
}

init();