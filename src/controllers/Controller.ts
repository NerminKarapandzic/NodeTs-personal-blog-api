import { Router } from "express"
import express from 'express'

export class Controller{
    public path: string
    public router: Router
    constructor(path: string){
        this.router = express.Router()
        this.path = path
    }
}