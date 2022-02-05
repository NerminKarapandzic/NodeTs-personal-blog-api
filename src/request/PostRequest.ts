import Joi from "joi"
import { ValidationException } from "../exception/ValidationException"

export class CreatePostRequest{
    title: string
    content: string
    image: string

    constructor(req: CreatePostRequest){
        console.log('Post request constructor called')
        this.title = req.title
        this.content = req.content
        this.image = req.image
        this.validate()
    }

    public validate = () => {
        try {
            const validation = Joi.object({
                tittle: Joi.string().required(),
                content: Joi.string().required(),
                image: Joi.string().required()
            }).validate(this)
    
            if(validation.error){
                console.log('Post validation failed with the following errors:', validation.error.details)
                throw new ValidationException("Invalid data", validation.error.details)
            }
        } catch (error) {
            console.log('error was caught, what to do with it, error', error);
            
        }
    }
}
  
export class UpdatePostRequest extends CreatePostRequest{
    published: boolean
}