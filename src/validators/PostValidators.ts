import Joi from "joi";

export const createPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
})

export const putPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    published: Joi.required()
})