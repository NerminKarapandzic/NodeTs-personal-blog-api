import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

class HomeController{
    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public index = async (req: Request, res: Response) => {
        const posts = await this.prisma.post.findMany();
        res.send(JSON.stringify(posts))
    }
}

export default new HomeController()