import { PrismaClient } from "@prisma/client";
import { PostResponseDto } from "../dto/PostResponseDto";
import { CreatePostRequest, UpdatePostRequest } from "../request/PostRequest";
import { PostPreviewDto } from "../dto/PostPreviewDto";
import { ApplicationException } from "../exception/ApplicationException";

export class PostService{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public async createPost(reqBody: CreatePostRequest, user: any): Promise<PostResponseDto>{
        const postReq = new CreatePostRequest(reqBody.title, reqBody.content, reqBody.image)
        
        console.log('Trying to save post to a database, post data:', postReq);
        
        const post = await this.prisma.post.create({
            data: {
                title: postReq.title, 
                image: postReq.image,
                content: postReq.content, 
                authorId: user && user.id
            }
        })

        return new PostResponseDto(post, user);
    }

    public async getPosts(limit: number, skip: number): Promise<PostPreviewDto[]>{
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

        const response: PostPreviewDto[] = posts.map( post => new PostPreviewDto(post, post.author))
        return response;
    }

    public async getSingle(id: number): Promise<PostResponseDto>{
        const post = await this.prisma.post.findFirst({
            where: {
                id: id,
                published: true
            },
            include: {
                author: true
            }
        })

        if(post){
            const response = new PostResponseDto(post, post.author)
            return response
        }else{
            throw new ApplicationException(`Post with id ${id} not found`, 404)
        }
    }

    public async getFeatured(): Promise<PostResponseDto>{
        const post = await this.prisma.post.findFirst({
            where: {
                featured: true,
                published: true
            },
            include: {
                author: true
            }
        })

        if(post && post.author) {
            const response = new PostResponseDto(post, post.author)
            return response
        }else{
            throw new ApplicationException('Could not find any featured posts', 404)
        }
    }

    public async update(id: number, user: any, reqBody: UpdatePostRequest): Promise<PostResponseDto>{
        const postReq = new UpdatePostRequest(reqBody.title, reqBody.content, reqBody.image, reqBody.published)

        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if(!post){
            throw new ApplicationException(`Post with id ${id} not found`, 404)
        }
        
        if(post.authorId != user.id){
            throw new ApplicationException('Forbidden', 403)
        }

        post.content = postReq.content
        post.title = postReq.title
        post.image = postReq.image
        post.published = postReq.published

        const updatedPost = await this.prisma.post.update({
            where: {
                    id: post.id
                },
            data: {
                content: post.content,
                title: post.title,
                image: post.image,
                published: post.published
            },
            include: {
                author: true
            }
        })

        return new PostResponseDto(updatedPost, updatedPost.author);
    }

    public async patchPublished(id: number, published: boolean, user: any): Promise<PostResponseDto>{
        if(published == null){
            throw new ApplicationException('Parameter published is required', 422)
        }

        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if(!post){
            throw new ApplicationException(`Post with id ${id} not found`, 404)
        }
        
        if(post.authorId != user.id){
            throw new ApplicationException('Forbidden', 403)
        }

        post.published = published

        const updatedPost = await this.prisma.post.update({
            where: {
                    id: post.id
                },
            data: {
                published: published
            },
            include: {
                author: true
            }
        })
        
        return new PostResponseDto(updatedPost, updatedPost.author);
    }


}