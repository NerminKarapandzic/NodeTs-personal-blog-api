import Joi from "joi"
import { ValidationException } from "../exception/ValidationException"

export class CreateTagsRequest{
    name: string
    color: string

    constructor(name: string, color: string){
        console.log('Post request constructor called')
        this.name = name
        this.color = color
        this.validate({name, color})
    }

    protected validate = (req: any) => {
        const validation = Joi.object({
            name: Joi.string().required(),
            color: Joi.string().required()
        }).validate(req)

        if(validation.error){
            console.log('Create tag validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}