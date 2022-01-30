import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AppRequest } from "../types/AppRequest";

class PostsController{
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public create = async (req: AppRequest, res: Response) => {
        
    }
}

export default new PostsController();