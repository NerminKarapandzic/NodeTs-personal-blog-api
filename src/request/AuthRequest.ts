import Joi from "joi"
import { ValidationException } from "../exception/ValidationException"

export class CreateUserRequest{
    email: string 
    name: string 
    password: string

    constructor(email: string, name: string, password: string){
        this.email = email
        this.name = name
        this.password = password
        this.validate({email, name, password})
    }

    private validate(req: any){
        const validation = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().min(3).max(30).alphanum().required(),
            password: Joi.string().min(6).required()
        }).validate(req)

        if(validation.error){
            console.log('Register user validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}

export class LoginRequest{
    email: string 
    name: string 
    password: string

    constructor(email: string, name: string, password: string){
        this.email = email
        this.password = password
        this.validate({email, name, password})
    }

    private validate(req: any){
        const validation = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required()
        }).validate(req)

        if(validation.error){
            console.log('Login user validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}

