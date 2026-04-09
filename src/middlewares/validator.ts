import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError.js";

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
            return next(ApiError.badRequest(errors));
        }
        req.body = result.data;
        next();
    };
}