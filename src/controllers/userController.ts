import { NextFunction, Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/userService.js";

export async function getUsersController(_req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsers();
        res.status(200).json({ users });
    } catch (error) {
        next(error);
    }
}

export async function getUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await getUser(req.params.id as string);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
}

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ 
            message: "User created successfully",
            user
        });
    } catch (error) {
        next(error);
    }
}

export async function updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await updateUser(req.params.id as string, req.body);
        res.status(200).json({ 
            message: "User updated successfully", 
            user 
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteUserController(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteUser(req.params.id as string);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
}