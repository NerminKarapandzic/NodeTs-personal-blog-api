import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { createPostSchema, putPostSchema } from "../validators/PostValidators";
import { AppRequest } from "../types/AppRequest";
import { PostPreviewDto } from "../dto/PostPreviewDto";
import { PostResponseDto } from "../dto/PostResponseDto";

class PostsController{
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public create = async (req: AppRequest, res: Response) => {
        const validation = createPostSchema.validate(req.body)
        
        if(validation.error){
            return res.status(422).send(validation.error.details)
        }

        const postReq = {...validation.value, authorId: req.user && req.user.id}
        try {
            const post = await this.prisma.post.create({
                data: postReq
            })

            res.send(post)
        } catch (error) {
            res.status(400).send(error)
        }
    }

    public update = async (req: AppRequest, res: Response) => {
        const postId = +req.params.post;

        const post = await this.prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post){
            return res.status(404).send({message: "Couldn't find post with id "+ postId})
        }
        
        if(post.id != req.user.id){
            return res.status(403).send()
        }

        const validation = putPostSchema.validate(req.body)

        if(validation.error){
            return res.status(422).send(validation.error.details)
        }

        post.content = validation.value.content
        post.title = validation.value.title
        post.published = validation.value.published

        try {
            const updatedPost = await this.prisma.post.update({
                where: {
                        id: post.id
                    },
                    data: post
            })

            res.send(updatedPost)
        } catch (error) {
            res.status(400).send(error)
        }
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

            const response = new PostResponseDto(post, post.author)

            res.send(response)
        }catch (error) {
            res.status(400).send()
        }
    }
}

export default new PostsController();