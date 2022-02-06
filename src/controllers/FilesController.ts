import { Request, Response } from 'express';
import { authenticationFilter } from '../middleware/authenticationFilter';
import { s3 } from '../config/awsS3';
import { Controller } from './Controller';
export class FilesController extends Controller{

    //TODO: Create request types, validate data, move logic to services

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post('/upload', [authenticationFilter, this.upload])
    }
    
    public upload = (req: Request, res: Response) => {
        const awsS3 = s3;

        if(req.files.files){
            const files: any = req.files.files;
            console.log(files);

            awsS3.upload({
                Bucket: process.env.SPACES_BUCKET,
                Key: 'personal-blog-dev/' + files.name,
                Body: files.data,
                ACL: 'public-read'
            }).promise().then( uploadResponse => {
                res.status(201).send(uploadResponse)
            }).catch(err => {
                res.status(400).send(err)  
            })
        }
    }
}