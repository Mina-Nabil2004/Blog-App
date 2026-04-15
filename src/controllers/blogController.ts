import { NextFunction, Request, Response } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../services/blogService.js";

export function getBlogsController(_req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ blogs: getBlogs() });
    } 
    catch (error) {
        next(error);
    }
}

export function getBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ blog: getBlog(req.params.id as string) });
    } 
    catch (error) {
        next(error);
    }
}

export function createBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(201).json({ 
            message: "Blog created successfully",
            blog: createBlog(req.body)
        });
    } 
    catch (error) {
        next(error);
    }
}

export function updateBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({ 
            message: "Blog updated successfully", 
            blog: updateBlog(req.params.id as string, req.body) 
        });
    } 
    catch (error) {
        next(error);
    }
}

export function deleteBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        deleteBlog(req.params.id as string);
        res.status(200).json({ message: "Blog deleted successfully" });
    } 
    catch (error) {
        next(error);
    }
}