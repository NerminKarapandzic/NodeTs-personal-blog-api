import { NextFunction, Request, Response } from "express";
import { AppRequestBody } from "../types/AppRequest";
import { PostResponseDto } from "../dto/PostResponseDto";
import { CreatePostRequest, UpdatePostRequest } from "../request/PostRequest";
import { Controller } from "./Controller";
import { authenticationFilter } from "../middleware/authenticationFilter";
import { PostService } from "../service/PostService";

export class PostsController extends Controller{

    private postService: PostService

    constructor(path: string){
        super(path)
        this.initializeRoutes()
        this.postService = new PostService()
    }

    private initializeRoutes(){
        this.router.get(this.path, this.getList)
        this.router.get(`${this.path}/featured`, this.getFeatured)
        this.router.get(`${this.path}/search`, this.search)
        this.router.get(`${this.path}/:id`, this.getSingle)
        this.router.post(this.path, [authenticationFilter, this.create])
        this.router.put(`${this.path}/:id`, [authenticationFilter, this.update])
        this.router.patch(`${this.path}/:id/published`, [authenticationFilter, this.patchPublished])
        this.router.patch(`${this.path}/:id/featured`, [authenticationFilter, this.patchFeatured])
    }

    private create = async (req: AppRequestBody<CreatePostRequest>, res: Response, next: NextFunction) => {
        try {
            const postResponse: PostResponseDto = await this.postService.createPost(req.body, req.user)
            res.send(postResponse)
        } catch (error) {
            next(error)
        }
    }

    private update = async (req: AppRequestBody<UpdatePostRequest>, res: Response, next: NextFunction) => {
        try {
            const response = await this.postService.update(+req.params.id, req.user, req.body)
            res.send(response)
        } catch (error) {
            next(error)
        }
    }

    private getList = async (req: Request, res: Response, next: NextFunction) => {
        const skip = +req.query.skip
        const limit = +req.query.limit

        try{
            const response = await this.postService.getPosts(limit, skip)
            res.send(response)
        }catch (error) {
            next(error)
        }
    }

    private getSingle = async (req: Request, res: Response, next: NextFunction) => {
        const postId = +req.params.id

        try{
            const response = await this.postService.getSingle(postId)

            res.send(response)
        }catch (error) {
            next(error)
        }
    }

    private getFeatured = async (req:Request, res: Response, next: NextFunction) => {
        try{
            const response = await this.postService.getFeatured()

            res.send(response)
        }catch (error) {
            next(error)
        }
    }

    private patchPublished = async (req:AppRequestBody<any>, res: Response, next: NextFunction) => {
        try{
            const response = await this.postService.patchPublished(+req.params.id, req.body.published, req.user)

            res.send(response)
        }catch (error) {
            next(error)
        }
    }

    private patchFeatured = async (req:AppRequestBody<any>, res: Response, next: NextFunction) => {
        try{
            const response = await this.postService.patchFeatured(+req.params.id, req.body.featured, req.user)

            res.send(response)
        }catch (error) {
            next(error)
        }
    }

    private search = async(req: Request, res: Response, next: NextFunction) => {
        const searchTerm = req.query.search.toString()

        try {
            const response = await this.postService.search(searchTerm)

            res.send(response)
        } catch (error) {
            next(error)
        }
    }
}
