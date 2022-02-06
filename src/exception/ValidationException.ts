import Joi from "joi"

export class ValidationException extends Error{

    errors: Joi.ValidationErrorItem[]
    status: number

    constructor(message: string, validationErrors: Joi.ValidationErrorItem[] ){
        super(message)
        this.errors = validationErrors
        this.status = 422
    }

}