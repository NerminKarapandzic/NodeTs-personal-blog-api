import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { authenticationFilter } from "../middleware/authenticationFilter";
import { UserResponse } from "../dto/UserDto";
import { AppRequestBody } from "../types/AppRequest";
import { Controller } from "./Controller";

export class UserController extends Controller{
    
    //TODO: Create request types, validate data, move logic to services

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get('/userinfo', [authenticationFilter, this.getUserInfo])
        this.router.get('/posts', [authenticationFilter, this.getPosts])
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
