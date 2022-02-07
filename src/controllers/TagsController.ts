import { NextFunction, Request, Response } from "express";
import { AppRequestBody } from "../types/AppRequest";
import { Controller } from "./Controller";
import { authenticationFilter } from "../middleware/authenticationFilter";
import { CreateTagsRequest } from "../request/TagsRequest";
import { TagsService } from "../service/TagsService";
import { Tag } from "@prisma/client";

export class TagsController extends Controller{

    private tagsService: TagsService

    constructor(path: string){
        super(path)
        this.initializeRoutes()
        this.tagsService = new TagsService()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.getList)
        this.router.post(this.path, [authenticationFilter, this.create])
    }

    private create = async (req: AppRequestBody<CreateTagsRequest>, res: Response, next: NextFunction) => {
        console.log('Create post controller invoked with following request body:', req.body);
        try {
            const tagResponse: Tag = await this.tagsService.createTag(req.body)
            res.send(tagResponse)
        } catch (error) {
            next(error)
        }
    }

    private getList = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const response = await this.tagsService.getTags()
            res.send(response)
        }catch (error) {
            next(error)
        }
    }
}
