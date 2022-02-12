import { PrismaClient } from "@prisma/client";
import { AuthResponse, UserResponse } from "../dto/UserDto";
import { CreateUserRequest, LoginRequest } from "../request/AuthRequest";
import bcrypt from 'bcryptjs'
import { ApplicationException } from "../exception/ApplicationException";
import { TokenUtil } from "../security/TokenUtil";

export class AuthService{

    prisma: PrismaClient = new PrismaClient()

    public async register(req: CreateUserRequest): Promise<UserResponse>{
        const user = await this.prisma.user.create({
            data: {
                email: req.email,
                name: req.name,
                password: bcrypt.hashSync(req.password, 10)
            }
        })

        const response: UserResponse = new UserResponse(user)
        return response
    }

    public async login(req: LoginRequest): Promise<AuthResponse>{
        const user = await this.prisma.user.findUnique({
            where: {
                email: req.email
            }
        })

        if(!user || !bcrypt.compareSync(req.password, user.password)){
            throw new ApplicationException('Unauthorized', 401)
        }

        const response: AuthResponse = new AuthResponse(TokenUtil.generateToken(user))
        return response;
    }
}