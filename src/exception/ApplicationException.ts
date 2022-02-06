export class ApplicationException extends Error{

    httpStatus: number
    message: string

    constructor(message: string, httpStatus: number ){
        super(message)
        this.httpStatus = httpStatus
    }


}