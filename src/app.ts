import express from 'express'
import dotenv from 'dotenv'
import RouteLoader from './RouteLoader';

dotenv.config()
const port = process.env.SERVER_PORT;

const app = RouteLoader.mountApi(express());

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log('Server started at port ' + port);
})