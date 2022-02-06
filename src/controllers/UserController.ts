import { NextFunction, Response } from "express";
import { authenticationFilter } from "../middleware/authenticationFilter";
import { AppRequestBody } from "../types/AppRequest";
import { Controller } from "./Controller";
import { UserService } from "../service/UserService";
import { UserResponse } from "../dto/UserDto";

export class UserController extends Controller{
    
    userService: UserService = new UserService()

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.get(`${this.path}/userinfo`, [authenticationFilter, this.getUserInfo])
        this.router.get(`${this.path}/posts`, [authenticationFilter, this.getPosts])
    }

    public getUserInfo = async (req: AppRequestBody<any>, res: Response, next: NextFunction) => {
        const user = req.user
        res.send( new UserResponse(user))
    }

    public getPosts = async (req: AppRequestBody<any>, res: Response, next: NextFunction) => {
        const user = req.user

        try {
            const response = await this.userService.getUserPosts(user.id)
            
            res.send(response)
        } catch (error) {
            next(error)
        }

    }
}
