import { NextFunction, Request, Response } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from "../services/blogService.js";

export async function getBlogsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getBlogs();
        res.status(200).json({ blogs });
    } 
    catch (error) {
        next(error);
    }
}

export async function getBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await getBlog(req.params.id as string);
        res.status(200).json({ blog });
    } 
    catch (error) {
        next(error);
    }
}

export async function createBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await createBlog(req.body);
        res.status(201).json({ 
            message: "Blog created successfully",
            blog
        });
    } 
    catch (error) {
        next(error);
    }
}

export async function updateBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await updateBlog(req.params.id as string, req.body);
        res.status(200).json({ 
            message: "Blog updated successfully", 
            blog 
        });
    } 
    catch (error) {
        next(error);
    }
}

export async function deleteBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteBlog(req.params.id as string);
        res.status(200).json({ message: "Blog deleted successfully" });
    } 
    catch (error) {
        next(error);
    }
}