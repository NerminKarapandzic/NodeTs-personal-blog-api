import { Request, Router } from "express";

// This is used so we can infer the type of the body of the request
export interface RequestBody<T> extends Request{
    body: T
}

//This is a request that has a user object attached to it, used on routes which require authentication
export interface AppRequestBody<T> extends RequestBody<T> {
    user: any
}
