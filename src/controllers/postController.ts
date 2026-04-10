import { NextFunction, Request, Response } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../services/postService.js";

export function getPostsController(_req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ posts: getPosts() });
    } 
    catch (error) {
        next(error);
    }
}

export function getPostController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ post: getPost(req.params.id as string) });
    } 
    catch (error) {
        next(error);
    }
}

export function createPostController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(201).json({ 
            message: "Post created successfully",
            post: createPost(req.body)
        });
    } 
    catch (error) {
        next(error);
    }
}

export function updatePostController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ 
            message: "Post updated successfully", 
            post: updatePost(req.params.id as string, req.body) 
        });
    } 
    catch (error) {
        next(error);
    }
}

export function deletePostController(req: Request, res: Response, next: NextFunction) {
    try {
        deletePost(req.params.id as string);
        res.status(200).json({ message: "Post deleted successfully" });
    } 
    catch (error) {
        next(error);
    }
}