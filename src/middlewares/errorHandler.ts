import ApiError from "../errors/ApiError.js";
import logger from "./logger.js";
import { Request, Response, NextFunction } from "express";


export default function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
    if(err instanceof ApiError){
        res.status(err.statusCode).json({ error: err.errors });
        logger.error({ statusCode: err.statusCode, message: JSON.stringify(err.errors) });
        return;
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ statusCode: 500, message });
    res.status(500).json({ errors: { server: "Something went wrong!" } });
}