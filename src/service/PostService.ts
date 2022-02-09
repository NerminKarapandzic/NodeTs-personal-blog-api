import { PrismaClient, Tag } from "@prisma/client";
import { PostResponseDto } from "../dto/PostResponseDto";
import { CreatePostRequest, UpdatePostRequest } from "../request/PostRequest";
import { PostPreviewDto } from "../dto/PostPreviewDto";
import { ApplicationException } from "../exception/ApplicationException";
import { PostsWithCount } from "../dto/PostsWithCount";

export class PostService{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public async createPost(reqBody: CreatePostRequest, user: any): Promise<PostResponseDto>{
        const postReq = new CreatePostRequest(reqBody.title, reqBody.content, reqBody.image, reqBody.tags)
        
        console.log('Trying to save post to a database, post data:', postReq);

        const post = await this.prisma.post.create({
            data: {
                title: postReq.title, 
                image: postReq.image,
                content: postReq.content, 
                author: {connect: {id: user.id}},
                tags: {
                    connect: reqBody.tags.map(tag => ({id: tag.id}))
                }
            },
            include: {
                tags: true
            }
        })

        return new PostResponseDto(post, user, post.tags);
    }

    public async getPosts(limit: number, skip: number): Promise<PostsWithCount>{
        const posts = await this.prisma.post.findMany({
            take: 5,
            skip: skip || 0,
            include: {
                author: true,
                tags: true
            },
            where: {
                published: true
            }
        })
        const count = await this.prisma.post.count()

        const _posts: PostPreviewDto[] = posts.map( post => new PostPreviewDto(post, post.author, post.tags))
        return new PostsWithCount(_posts, count);
    }

    public async getSingle(id: number): Promise<PostResponseDto>{
        const post = await this.prisma.post.findFirst({
            where: {
                id: id,
                published: true
            },
            include: {
                author: true,
                tags: true
            }
        })

        if(post){
            const response = new PostResponseDto(post, post.author, post.tags)
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
                author: true,
                tags: true
            }
        })

        if(post && post.author) {
            const response = new PostResponseDto(post, post.author, post.tags)
            return response
        }else{
            throw new ApplicationException('Could not find any featured posts', 404)
        }
    }

    public async update(id: number, user: any, reqBody: UpdatePostRequest): Promise<PostResponseDto>{
        const postReq = new UpdatePostRequest(reqBody.title, reqBody.content, reqBody.image, reqBody.published, reqBody.tags)

        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                tags: true
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

        //TODO: send tags with additional property defining if it should be connected or disconnected

        await this.prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                tags: {
                    disconnect: post.tags.map(tag => ({id: tag.id}))
                }
            }
        })

        const updatedPost = await this.prisma.post.update({
            where: {
                    id: post.id
                },
            data: {
                content: post.content,
                title: post.title,
                image: post.image,
                published: post.published,
                tags: {
                    connect: reqBody.tags.map(tag => ({id: tag.id}))
                }
            },
            include: {
                author: true,
                tags: true
            }
        })

        return new PostResponseDto(updatedPost, updatedPost.author, updatedPost.tags);
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
                author: true,
                tags: true
            }
        })
        
        return new PostResponseDto(updatedPost, updatedPost.author, updatedPost.tags);
    }

    public async search(searchTerm: string){
        const posts = await this.prisma.post.findMany({
            where: {
                title: {
                    contains: searchTerm
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: true,
                tags: true
            }
        })

        const response: PostPreviewDto[] = posts.map( post => new PostPreviewDto(post, post.author, post.tags))
        return response;
    }
}