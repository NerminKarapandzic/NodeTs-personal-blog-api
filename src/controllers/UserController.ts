import { PrismaClient } from "@prisma/client";
import { NextFunction, Response } from "express";
import { authenticationFilter } from "../middleware/authenticationFilter";
import { UserResponse } from "../dto/UserDto";
import { AppRequestBody } from "../types/AppRequest";
import { Controller } from "./Controller";
import { UserService } from "../service/UserService";

export class UserController extends Controller{
    
    userService: UserService = new UserService()
    
    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get('/userinfo', [authenticationFilter, this.getUserInfo])
        this.router.get('/posts', [authenticationFilter, this.getPosts])
    }

    public getUserInfo = async (req: AppRequestBody<any>, res: Response, next: NextFunction) => {
        const user = req.user

        try {
            const response = this.userService.getUserInfo(user.id)
            res.send(response)
        } catch (error) {
            next(error)
        }
    }

    public getPosts = async (req: AppRequestBody<any>, res: Response, next: NextFunction) => {
        const user = req.user

        try {
            const response = this.userService.getUserPosts(user.id)
            
            res.send(response)
        } catch (error) {
            next(error)
        }

    }
}
