import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { UserResponse } from "../dto/UserDto";
import { AppRequestBody } from "../types/AppRequest";

class UserController{
    prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    public getUserInfo = async (req: AppRequestBody<any>, res: Response) => {
        const user = req.user

        const userFromDb = await this.prisma.user.findUnique({
            where: {
                id: user.id
            }
        })

        res.send(new UserResponse(userFromDb))
    }

    public getPosts = async (req: AppRequestBody<any>, res: Response) => {
        const user = req.user

        const posts = await this.prisma.post.findMany({
            where: {
                authorId: user.id
            }
        })

        res.send(posts)
    }
}

export default new UserController()