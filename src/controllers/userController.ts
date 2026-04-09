import { Request, Response } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../services/userService.js";

export function getUsersController(req: Request, res: Response) {
  res.status(200).json({ users: getUsers() });
}

export function getUserController(req: Request, res: Response) {
  res.status(200).json({ user: getUser(req.params.id as string) });
}

export function createUserController(req: Request, res: Response) {
    res.status(201).json({ 
        message: "User created successfully",
        user: createUser(req.body)
    });
}

export function updateUserController(req: Request, res: Response) {
    res.status(201).json({ 
        message: "User updated successfully", 
        user: updateUser(req.params.id as string, req.body) 
    });
}

export function deleteUserController(req: Request, res: Response) {
    deleteUser(req.params.id as string);
    res.status(200).json({ message: "User deleted successfully" });
}