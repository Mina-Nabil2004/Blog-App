import { NextFunction, Request, Response } from "express";
import { createBlog, deleteBlog, getBlog, getBlogs, getPublishedBlogs, getBlogsByUser, updateBlog, publishBlog, unpublishBlog } from "../services/blogService.js";

export async function getBlogsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getBlogs();
        res.json({ blogs });
    } catch (error) { next(error); }
}

export async function getPublishedBlogsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getPublishedBlogs();
        res.json({ blogs });
    } catch (error) { next(error); }
}

export async function getBlogsByUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getBlogsByUser(req.params.userID as string);
        res.json({ blogs });
    } catch (error) { next(error); }
}

export async function getBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await getBlog(req.params.id as string);
        res.json({ blog });
    } catch (error) { next(error); }
}

export async function createBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await createBlog(req.body);
        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) { next(error); }
}

export async function updateBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const blog = await updateBlog(req.params.id as string, req.body);
        res.json({ message: "Blog updated successfully", blog });
    } catch (error) { next(error); }
}

export async function publishBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userID } = req.user as { userID: string };
        const blog = await publishBlog(req.params.id as string, userID);
        res.json({ message: "Blog published successfully", blog });
    } catch (error) { next(error); }
}

export async function unpublishBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userID } = req.user as { userID: string };
        const blog = await unpublishBlog(req.params.id as string, userID);
        res.json({ message: "Blog unpublished successfully", blog });
    } catch (error) { next(error); }
}

export async function deleteBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userID, role } = req.user as { userID: string; role: string };
        await deleteBlog(req.params.id as string, userID, role);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) { next(error); }
}