import { Router } from "express"
import express from 'express'
import { PrismaClient } from "@prisma/client"

export class Controller{
    public path: string
    public router: Router
    public prisma: PrismaClient
    constructor(path: string){
        this.router = express.Router()
        this.prisma = new PrismaClient()
        this.path = path
    }
}