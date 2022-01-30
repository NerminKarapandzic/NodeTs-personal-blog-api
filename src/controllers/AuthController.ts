import { prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import  {createUserSchema, loginSchema}  from "../validators/AuthValidators";
import bcrypt from 'bcryptjs'
import { AuthResponse, UserResponse } from "../models/UserDto";
import { TokenUtil } from "../security/TokenUtil";
class AuthController{

    prisma = new PrismaClient()

    public register = async (req: Request, res: Response) => {
        const validation = createUserSchema.validate(req.body)
        
        if(validation.error){
            res.status(422).send(validation.error.details)
            return
        }

        validation.value.password = bcrypt.hashSync(validation.value.password, 10)
        
        try{
            const user = await this.prisma.user.create({
                data: validation.value
            })

            const response: UserResponse = new UserResponse(user)

            res.send(response)
        } catch (e) {
            res.status(400).send(e)
        }
    }

    public login = async (req: Request, res: Response) => {
        const validation = loginSchema.validate(req.body)

        if(validation.error){
            return res.status(422).send(validation.error.details)
        }

        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email: validation.value.email
                }
            })

            if(!user || !bcrypt.compareSync(validation.value.password, user.password)){
                return res.status(401).send()
            }
            
            const response: AuthResponse = new AuthResponse(TokenUtil.generateToken(user))
            
            res.send(response)
        }catch (e) {
            res.status(400).send(e)
        }
    }
}

export default new AuthController();
