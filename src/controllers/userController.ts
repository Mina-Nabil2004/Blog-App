import { NextFunction, Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, changePassword, changeRole, getUserBlogs, getUserComments } from "../services/userService.js";

export async function getUsersController(_req: Request, res: Response, next: NextFunction) {
    try {
        const users = await getUsers();
        res.json({ users });
    } catch (error) { next(error); }
}

export async function getUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await getUser(req.params.id as string);
        res.json({ user });
    } catch (error) { next(error); }
}

export async function createUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
             message: "User created successfully", 
             user 
        });
    } catch (error) { next(error); }
}

export async function updateUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await updateUser(req.params.id as string, req.body);
        res.json({ 
            message: "User updated successfully", 
            user 
        });
    } catch (error) { next(error); }
}

export async function changePasswordController(req: Request, res: Response, next: NextFunction) {
    try {
        await changePassword(req.params.id as string, req.body);
        res.json({ message: "Password changed successfully" });
    } catch (error) { next(error); }
}

export async function changeRoleController(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await changeRole(req.params.id as string, req.body);
        res.json({ 
            message: "Role changed successfully", 
            user 
        });
    } catch (error) { next(error); }
}

export async function getUserBlogsController(req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getUserBlogs(req.params.id as string);
        res.json({ blogs });
    } catch (error) { next(error); }
}

export async function getUserCommentsController(req: Request, res: Response, next: NextFunction) {
    try {
        const comments = await getUserComments(req.params.id as string);
        res.json({ comments });
    } catch (error) { next(error); }
}

export async function deleteUserController(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteUser(req.params.id as string);
        res.json({ message: "User deleted successfully" });
    } catch (error) { next(error); }
}