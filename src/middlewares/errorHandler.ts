import ApiError from "../errors/ApiError";
import logger from "./logger";
import { Request, Response, NextFunction } from "express";


export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({ error: err.message });
        logger.error('API Error', { statusCode: err.statusCode, message: err.message });
        return;
    }
    res.status(500).json({ error: 'Something went wrong!' });
}