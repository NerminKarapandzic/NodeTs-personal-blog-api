import { NextFunction, Request, Response } from "express";
import { ApplicationException } from "../exception/ApplicationException";

/**
 * This middleware will be the last generic middleware in chain which will deal with all unhandled exception
 *
 */
function unhandledExceptionHandler(error: ApplicationException, request: Request, response: Response, next: NextFunction) {
    console.log('Unhandled exception handler caught the following error: ', error)
    const message = 'Unhandled exception';
    const status = error.httpStatus || 500

    response
      .status(status)
      .send({
        status,
        message,
      })
  }

  export default unhandledExceptionHandler;