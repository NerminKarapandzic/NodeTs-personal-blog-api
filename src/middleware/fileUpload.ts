import { RequestHandler } from "express";
import fileUpload from "express-fileupload";

export const upload: RequestHandler = fileUpload();
