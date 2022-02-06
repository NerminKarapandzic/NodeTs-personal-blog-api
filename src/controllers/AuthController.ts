import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import { AuthResponse, UserResponse } from "../dto/UserDto";
import { TokenUtil } from "../security/TokenUtil";
import { Controller } from "./Controller";
export class AuthController extends Controller{

    //TODO: Create request types, validate data, move logic to services

    constructor(path: string){
        super(path)
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/login`, this.login)
    }

    public register = async (req: Request, res: Response) => {

        
        try{
            const user = await this.prisma.user.create({
                data: null
            })

            const response: UserResponse = new UserResponse(user)

            res.send(response)
        } catch (e) {
            res.status(400).send(e)
        }
    }

    public login = async (req: Request, res: Response) => {
        //TODO: Create dto and validation

        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })

            if(!user || !bcrypt.compareSync(req.body.password, user.password)){
                return res.status(401).send()
            }
            
            const response: AuthResponse = new AuthResponse(TokenUtil.generateToken(user))
            
            res.send(response)
        }catch (e) {
            res.status(400).send(e)
        }
    }
}

