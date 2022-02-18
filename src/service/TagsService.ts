import { PrismaClient, Tag } from "@prisma/client";
import { CreateTagsRequest } from "../request/TagsRequest";

export class TagsService{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient()
    }

    public async createTag(reqBody: CreateTagsRequest): Promise<Tag>{
        const postReq = new CreateTagsRequest(reqBody.name, reqBody.color)

        console.log('Trying to save tag to a database, tag data:', postReq);

        const tag = await this.prisma.tag.create({
            data: {
                name: postReq.name,
                color: postReq.color
            },
        })

        return tag;
    }

    public async getTags(): Promise<Tag[]>{
        const tags = await this.prisma.tag.findMany()

        return tags;
    }

}