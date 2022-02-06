import { PrismaClient } from "@prisma/client";
import { UserResponse } from "../dto/UserDto";
import { PostPreviewDto } from "../dto/PostPreviewDto";


export class UserService {
    prisma: PrismaClient = new PrismaClient()

    public async getUserPosts(userId: number): Promise<PostPreviewDto[]>{
        console.log('Getting user posts for user id:', userId)
        const posts = await this.prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: true
            }
        })
        const response: PostPreviewDto[] = posts.map(post => new PostPreviewDto(post, post.author))
        return response
    }

    public async getUserInfo(userId: number): Promise<UserResponse>{

        const userFromDb = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        return new UserResponse(userFromDb);
    }
}