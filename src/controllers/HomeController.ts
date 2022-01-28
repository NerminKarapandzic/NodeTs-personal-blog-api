import { Request, Response } from "express";

class HomeController{
    public index(req: Request, res: Response){
        return res.end('There is no place like 127.0.0.1 ...')
    }
}

export default new HomeController()