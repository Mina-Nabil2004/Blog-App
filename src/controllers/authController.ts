import { NextFunction, Request, Response } from "express";
import { loginUser, logoutUser, refreshAccessToken, signupUser } from "../services/authService.js";

export async function signupController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await signupUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

export async function loginController(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await loginUser(req.body);
        res.json({
            message: "User logged in successfully",
            response
        });
    } catch (error) {
        next(error);
    }
}

export async function logoutController(req: Request, res: Response, next: NextFunction) {
    try {
        const { refreshToken } = req.body;
        await logoutUser(refreshToken);
        res.json({
            message: "User logged out successfully"
        });
    } catch (error) {
        next(error);
    }
}

export async function refreshTokenController(req: Request, res: Response, next: NextFunction) {
    try {
        const { refreshToken } = req.body;
        const response = await refreshAccessToken(refreshToken);
        res.json({
            message: "Access token refreshed successfully",
            response
        });
    } catch (error) {
        next(error);
    }
}