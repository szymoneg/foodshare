import Joi from "joi";

export default{
    authenticate: {
        payload: {
          login: Joi.string().required(),
          password: Joi.string().required()
        }
      },
      createOrUpdateUser: {
        payload: {
          id: Joi.string(),
          email: Joi.string(),
          password: Joi.string(),
          name: Joi.string(),
          username: Joi.string(),
          surname: Joi.string(),
          address: Joi.string(),
          postCode: Joi.string(),
          city: Joi.string(),
          phone: Joi.string(),
          isAdmin: Joi.boolean(),
          avatar: Joi.string(),
          role: Joi.string(),
          active: Joi.boolean(),
          policy: Joi.boolean()
        }
      },
      removeById: {
        params: {
          id: Joi.string().required()
        }
      },
      getById: {
        params: {
          id: Joi.string().required()
        }
      },
      getByName: {
        params: {
          name: Joi.string().required()
        }
      },
      activation: {
        params: {
          hash: Joi.string().required()
        }
      },
      createOrUpdateBook: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          visible: Joi.boolean(),
          title: Joi.string().required(),
          author: Joi.string().required(),
          content: Joi.string(),
          page: Joi.number()
        }
      },
      removeBook: {
        params: {
          id: Joi.string().required()
        }
      }
}