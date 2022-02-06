import { Post, User } from "@prisma/client"
import { UserResponse } from './UserDto'

export class PostResponseDto{
    id: any
    createdAt: Date
    title: string
    content: string
    author: UserResponse
    image: string
    published: boolean

    constructor(post: Post, author: User){
        this.id = post.id
        this.createdAt = post.createdAt
        this.title = post.title
        this.content = JSON.parse(post.content || '')
        this.author = new UserResponse(author)
        this.image = post.image
        this.published = post.published
    }
}