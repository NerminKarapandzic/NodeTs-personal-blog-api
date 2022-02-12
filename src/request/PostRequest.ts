import Joi from "joi"
import { ApplicationException } from "../exception/ApplicationException"
import { ValidationException } from "../exception/ValidationException"

export class CreatePostRequest{
    title: string
    content: string
    image: string
    tags: Tag[]

    constructor(title: string, content: string, image: string, tags: Tag[] ){
        console.log('Post request constructor called')
        this.title = title
        this.content = content
        this.image = image
        this.tags = tags
        this.validate({title, content, image})
    }

    protected validate = (req: any) => {
        /* try{
            const c = JSON.parse(this.content)
        }catch(error){
            throw new ApplicationException('Content must be JSON (stringified)', 422)
        } */

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

export class UpdatePostRequest{
    title: string
    content: string
    image: string
    published: boolean
    tags: Tag[]

    constructor(title: string, content: string, image: string, published: boolean, tags: Tag[]){
        this.title = title
        this.content = content
        this.image = image
        this.published = published
        this.tags = tags
        this.validate({title, content, image, published, tags})
    }

    protected validate = (req: any) => {

        const validation = Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            image: Joi.string().required(),
            published: Joi.boolean().required(),
            tags: Joi.required()
        }).validate(req)

        if(validation.error){
            console.log('Update post validation failed with the following errors:', validation.error.details)
            throw new ValidationException('Invalid data', validation.error.details)
        }
    }
}

interface Tag {
    id: number,
    name: string,
    color: string
}