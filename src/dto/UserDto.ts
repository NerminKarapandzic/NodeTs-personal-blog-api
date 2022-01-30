import { User } from "@prisma/client";

export class UserResponse{
    id: number
    name: string
    email: string

    constructor(user: User){
        this.id = user.id;
        this.name = user.name
        this.email = user.email
    }
}

export class AuthResponse{
    accessToken: string

    constructor(token: string){
        this.accessToken = token
    }
}