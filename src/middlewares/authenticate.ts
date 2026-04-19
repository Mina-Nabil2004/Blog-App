import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../errors/ApiError.js";

export default function authenticate(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
        return next(ApiError.unauthorized({ token: "No token provided" }));

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        req.user = payload;
        next();
    } catch {
        next(ApiError.unauthorized({ token: "Invalid or expired token" }));
    }
}