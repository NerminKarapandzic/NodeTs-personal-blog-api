import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../exception/ValidationException";

/**
 * This is responsible for handling ValidationException
 * If the error is not of type ValidationException it will be passed to the next error handler in the chain
 */
function validationExceptionHandler(error: ValidationException, request: Request, response: Response, next: NextFunction) {
    if(error instanceof ValidationException){
      console.log('Validation exception handler caught the following error: ', error)
      const message = error.message || 'Something went wrong';
      response
        .status(error.status)
        .send({
          status: error.status,
          message: message,
          errors: error.errors
        })
    }else{
      next(error)
    }
  }
   
  export default validationExceptionHandler;