import { NextFunction, Request, Response } from "express";
import { ApplicationException } from "../exception/ApplicationException";

function applicationExceptionHandler(error: ApplicationException, request: Request, response: Response, next: NextFunction) {
    if(error instanceof ApplicationException){
      console.log('Application excpetion handler caught the following error: ', error)

      response
        .status(error.httpStatus)
        .send({
          status: error.httpStatus,
          message: error.message
        })
    }else{
      next(error)
    }
  }

  export default applicationExceptionHandler;