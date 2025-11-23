const Joi = require('joi');

const taskSchemas = {
    create: Joi.object({
        title: Joi.string().min(2).max(50).required(),
        description: Joi.string().min(2).max(255).optional()
    }),

    getAll: Joi.object({
        id: Joi.number().integer().min(1).max(99999).optional(),
        title: Joi.string().min(2).max(50).optional(),
        description: Joi.string().min(2).max(255).optional(),
        status: Joi.number().valid(1, 2, 3, 4).optional(),
        created_at_start: Joi.date().iso().optional(),
        created_at_end: Joi.date().iso().optional(),
        limit: Joi.number().integer().min(0).max(1000).default(50).optional(),
        offset: Joi.number().integer().min(0).max(1000).default(0).optional(),
        sortBy: Joi.string().valid('id', 'created_at').default('id').optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC').optional(),
    }),

    update: Joi.object({
        field: Joi.string().valid('title', 'description', 'status').required(),
        value: Joi.string().min(2).max(255).required()
    }),
}

module.exports = taskSchemas;