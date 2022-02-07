import { Post, Tag, User } from "@prisma/client"
import { UserResponse } from './UserDto'

export class PostResponseDto{
    id: any
    createdAt: Date
    title: string
    content: string
    author: UserResponse
    image: string
    published: boolean
    tags: Tag[]

    constructor(post: Post, author: User, tags: Tag[]){
        this.id = post.id
        this.createdAt = post.createdAt
        this.title = post.title
        this.content = post.content
        this.author = new UserResponse(author)
        this.image = post.image
        this.published = post.published
        this.tags = tags
    }
}