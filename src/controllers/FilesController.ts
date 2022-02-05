import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { s3 } from '../config/awsS3';
class FilesController{
    
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

export default new FilesController()