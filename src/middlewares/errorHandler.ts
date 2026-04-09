import { error } from "node:console";
import ApiError from "../errors/ApiError.js";
import logger from "./logger.js";
import { Request, Response, NextFunction } from "express";


export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({ error: err.message });
        logger.error({ statusCode: err.statusCode, message: JSON.stringify(err.message) });
        return;
    }
    res.status(500).json({ error: 'Something went wrong!' });
}