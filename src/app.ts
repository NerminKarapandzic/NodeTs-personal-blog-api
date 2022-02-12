import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import validationExceptionHandler from './middleware/validationExceptionHandler';
import unhandledExceptionHandler from './middleware/unhandledExceptionHandler';
import { Controller } from './controllers/Controller';
import applicationExceptionHandler from './middleware/applicationExceptionHandler';

dotenv.config({path: `.env.${process.env.NODE_ENV}`})
export class App{
    public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`App listening on the port ${process.env.SERVER_PORT}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors({
        origin: "*",
        methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"]
    }))
  }

  private initializeErrorHandling() {
    this.app.use(validationExceptionHandler)
    this.app.use(applicationExceptionHandler)
    this.app.use(unhandledExceptionHandler)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
  }
}