import { Request } from "express";


export type RequestBody<T> = Request<{}, {}, T>;

export interface AppRequestBody<T> extends RequestBody<T> {
    user: any
}