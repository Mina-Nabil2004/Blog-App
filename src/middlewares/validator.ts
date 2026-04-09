import { z } from "zod";
import logger from "./logger";
import { Request, Response, NextFunction } from "express";

function formatZodErrors(error: z.ZodError) {
    return error.issues.reduce((acc: Record<string, string>, err) =>{
        const field = err.path.join(".");
        acc[field] = err.message;
        return acc;
    }, {});
}

export default function validator(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errors = formatZodErrors(result.error);
            logger.error('Validation failed', { errors });
            return res.status(400).json(errors);
        }
        req.body = result.data;
        next();
    };
}