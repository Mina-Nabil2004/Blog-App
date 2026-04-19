import { Request, Response, NextFunction } from "express";
import ApiError from "../errors/ApiError.js";

export default function authorize(...roles: string[]) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const user = req.user as { userID: string; role: string };
        if (!user || !roles.includes(user.role)) {
            return next(ApiError.forbidden({ role: "You do not have permission to perform this action" }));
        }
        next();
    };
}