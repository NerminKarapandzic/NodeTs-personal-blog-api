import {Express} from 'express'
import apiRouter from './routes/api'

class RouteLoader{
    mountApi(express: Express) {
        const apiPrefix = "api";

        return express.use(`/${apiPrefix}`, apiRouter);
    }
}

export default new RouteLoader();