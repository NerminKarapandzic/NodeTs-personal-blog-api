import { NextFunction, Request, Response } from 'express';
import { FileService } from '../service/FileService';
import { authenticationFilter } from '../middleware/authenticationFilter';
import { Controller } from './Controller';
import { upload } from '../middleware/fileUpload';
export class FilesController extends Controller{

    fileService: FileService = new FileService()

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/upload`, [authenticationFilter, upload, this.upload])
    }
    
    public upload = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Upload request with files: ', req.files);
        
        try {
            const response = await this.fileService.upload(req.files)
            res.send(response)
        } catch (error) {
            next(error)
        }    
    }
}