import Joi from "joi"
import { ApplicationException } from "../exception/ApplicationException"
import { ValidationException } from "../exception/ValidationException"

export class CreatePostRequest{
    title: string
    content: string
    image: string

    constructor(title: string, content: string, image: string ){
        console.log('Post request constructor called')
        this.title = title
        this.content = content
        this.image = image
        this.validate({title, content, image})
    }

    protected validate = (req: any) => {
        try{
            JSON.parse(this.content)
        }catch(error){
            throw new ApplicationException('Content must be JSON (stringified)', 422)
        }

        const validation = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required()
        }).validate(req)

        if(validation.error){
            console.log('Create post validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}
  
export class UpdatePostRequest extends CreatePostRequest{
    published: boolean

    constructor(title: string, content: string, image: string, published: boolean){
        super(title, content, image)
        this.published = published
    }

    protected validate = (req: CreatePostRequest) => {
        try{
            JSON.parse(this.content)
        }catch(error){
            throw new ApplicationException('Content must be JSON (stringified)', 422)
        }

        const validation = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required(),
            published: Joi.boolean().required()
        }).validate(req)

        if(validation.error){
            console.log('Update post validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}