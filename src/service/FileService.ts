import { ApplicationException } from '../exception/ApplicationException';
import { s3 } from '../config/awsS3';

export class FileService{

    public async upload(requestFiles: any){
        if(!requestFiles?.files){
            throw new ApplicationException('Files not received', 400)
        }
        const files: any = requestFiles.files;
        
        const awsS3 = s3;

        return awsS3.upload({
            Bucket: process.env.SPACES_BUCKET,
            Key: 'personal-blog-dev/' + files.name,
            Body: files.data,
            ACL: 'public-read'
        }).promise()
    }
}