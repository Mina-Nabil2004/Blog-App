import { Request, Response, NextFunction } from "express";
import { createComment, getComment, getComments, getCommentsByBlog, getCommentsByUser, updateComment, deleteComment } from "../services/commentService.js";

export async function createCommentController(req: Request, res: Response, next: NextFunction) {
    try {
        const comment = await createComment(req.body);
        res.status(201).json({ 
            message: "Comment created successfully", 
            comment 
        });
    } catch (err) { next(err); }
}

export async function getCommentsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const comments = await getComments();
        res.json({ comments });
    } catch (err) { next(err); }
}

export async function getCommentsByBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        const comments = await getCommentsByBlog(req.params.blogID as string);
        res.json({ comments });
    } catch (err) { next(err); }
}

export async function getCommentsByUserController(req: Request, res: Response, next: NextFunction) {
    try {
        const comments = await getCommentsByUser(req.params.userID as string);
        res.json({ comments });
    } catch (err) { next(err); }
}

export async function getCommentController(req: Request, res: Response, next: NextFunction) {
    try {
        const comment = await getComment(req.params.id as string);
        res.json({ comment });
    } catch (err) { next(err); }
}

export async function updateCommentController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userID } = req.user as { userID: string };
        const comment = await updateComment(req.params.id as string, req.body, userID);
        res.json({ 
            message: "Comment updated successfully", 
            comment 
        });
    } catch (err) { next(err); }
}

export async function deleteCommentController(req: Request, res: Response, next: NextFunction) {
    try {
        const { userID, role } = req.user as { userID: string; role: string };
        await deleteComment(req.params.id as string, userID, role);
        res.json({ message: "Comment deleted successfully" });
    } catch (err) { next(err); }
}