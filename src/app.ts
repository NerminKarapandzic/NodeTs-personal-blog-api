import express from 'express'
import dotenv from 'dotenv'
import RouteLoader from './RouteLoader';
import cors from 'cors'

dotenv.config()
const port = process.env.SERVER_PORT;

const exp = express()

exp.use(cors({
    origin: "*",
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
}))

exp.use(express.json());

const app = RouteLoader.mountApi(exp);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log('Server started at port ' + port);
})