import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { AuthResponse, UserResponse } from "../dto/UserDto";
import { TokenUtil } from "../security/TokenUtil";
import { Controller } from "./Controller";
import { AuthService } from "../service/AuthService";
import { AppRequestBody } from "../types/AppRequest";
import { CreateUserRequest } from "../request/AuthRequest";
import { nextTick } from "process";
export class AuthController extends Controller{

    // TODO: Create request types, validate data, move logic to services
    authService: AuthService = new AuthService()

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        // this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/login`, this.login)
    }

    public register = async (req: AppRequestBody<CreateUserRequest>, res: Response, next: NextFunction) => {

        try{
            const response = await this.authService.register(req.body)
            res.send(response)
        } catch (error) {
            next(error)
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const response = await this.authService.login(req.body)

            res.send(response)
        }catch (error) {
            next(error)
        }
    }
}

