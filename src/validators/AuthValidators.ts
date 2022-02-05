import Joi from "joi";
import { CreateUserRequest, LoginRequest } from "../request/AuthRequest";


export const createUserSchema = Joi.object(new CreateUserRequest())

export const loginSchema = Joi.object(new LoginRequest())