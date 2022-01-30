import Joi from "joi";


export const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).max(30).alphanum().required(),
    password: Joi.string().min(6).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})