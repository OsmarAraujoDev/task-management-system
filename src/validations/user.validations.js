const Joi = require('joi');

const userSchemas = {
    register: Joi.object({
        nickname: Joi.string().min(2).max(100).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(8).max(20).optional(),
        password: Joi.string().min(8).required()
    }),

    getAll: Joi.object({
        limit: Joi.number().integer().min(0).max(50).optional(),
        offset: Joi.number().integer().min(0).default(0).optional(),
        orderBy: Joi.string().valid('ASC', 'DESC').default('ASC').optional()
    }),

    getById: Joi.object({
        id: Joi.number().integer().min(1).required()
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }),

    update: Joi.object({
        field: Joi.string().valid('nickname', 'email', 'phone', 'is_active').required(),
        value: Joi.string().required()
    }),

    delete: Joi.object({
        id: Joi.number().integer().required()
    }),
}

module.exports = userSchemas;