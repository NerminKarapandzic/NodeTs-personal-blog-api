import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { AppRequestBody, RequestBody } from "../types/AppRequest";
import { PostPreviewDto } from "../dto/PostPreviewDto";
import { PostResponseDto } from "../dto/PostResponseDto";
import { CreatePostRequest, UpdatePostRequest } from "../request/PostRequest";
import { CreateUserRequest } from "../request/AuthRequest";

class PostsController{
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public create = async (req: AppRequestBody<CreatePostRequest>, res: Response) => {
        console.log('Create post controller invoked with following request body:', req.body);
        
        const postReq = new CreatePostRequest(req.body)
        
        try {
            postReq.validate()
        } catch (error) {
            console.log('Error was caught, error', error);
            
        }

        postReq.content = JSON.stringify(postReq.content)
        
        try {
            console.log('Trying to save post to a database, post data:', postReq);
            
            const post = await this.prisma.post.create({
                data: {...postReq, author: req.user.id}
            })

            res.send(post)
        } catch (error) {
            console.log('Failed while trying to save post to a database, error:', error);
            
            res.status(400).send(error)
        }
    }

    public update = async (req: AppRequestBody<UpdatePostRequest>, res: Response) => {
        //Refactoring needed
    }

    public getList = async (req: Request, res: Response) => {
        const skip = +req.query.skip
        const limit = req.query.limit

        try{
            const posts = await this.prisma.post.findMany({
                take: 5,
                skip: skip ? skip : 0,
                include: {
                    author: true
                },
                where: {
                    published: true
                }
            })

            const response = posts.map( post => new PostPreviewDto(post, post.author))

            res.send(response)
        }catch (error) {
            res.status(400).send()
        }
    }

    public getSingle = async (req: Request, res: Response) => {
        const postId = +req.params.post

        try{
            const post = await this.prisma.post.findFirst({
                where: {
                    id: postId,
                    published: true
                },
                include: {
                    author: true
                }
            })

            if(post){
                const response = new PostResponseDto(post, post.author)
                res.send(response)
            }else{
                res.send({error: {
                    message: 'Post not found'
                }})
            }
            

        }catch (error) {
            res.status(400).send(error)
        }
    }

    public getFeatured = async (req:Request, res: Response) => {
        try{
            const post = await this.prisma.post.findFirst({
                where: {
                    featured: true,
                    published: true
                },
                include: {
                    author: true
                }
            })

            const response = new PostResponseDto(post, post.author)

            res.send(response)
        }catch (error) {
            res.status(400).send()
        }
    }
}

export default new PostsController();