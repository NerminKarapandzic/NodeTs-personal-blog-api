import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { LoginRequest } from "../request/AuthRequest"
import { AppRequestBody } from "../types/AppRequest"

/**
 * This middleware is responsible for attaching the user object to the request
 * It's not registered as global middleware but rather only on the endpoints where we need the user to be authenticated
 * 
 */
export const authenticationFilter = (req: AppRequestBody<LoginRequest>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send()

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}