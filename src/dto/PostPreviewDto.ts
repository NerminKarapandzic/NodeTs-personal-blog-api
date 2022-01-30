import { Post, User } from "@prisma/client"
import { UserResponse } from './UserDto'

export class PostPreviewDto{
    id: any
    createdAt: Date
    title: string
    author: UserResponse

    constructor(post: Post, author: User){
        this.id = post.id
        this.createdAt = post.createdAt
        this.title = post.title
        this.author = new UserResponse(author)
    }
}