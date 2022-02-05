import { PrismaClient } from "@prisma/client";
import { CreatePostRequest } from "../request/PostRequest";

class PostService{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public createPost(req: CreatePostRequest){
        
    }
}