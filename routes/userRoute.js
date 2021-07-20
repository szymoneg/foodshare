const Joi = require('joi')

//TODO make all routes for new api
exports.load = [
    {
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
    }
]

