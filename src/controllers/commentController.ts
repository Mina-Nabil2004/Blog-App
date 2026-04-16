// controllers/commentController.ts
import { Request, Response, NextFunction } from "express";
import { createComment, getComment, getComments, updateComment, deleteComment } from "../services/commentService.js";

export async function createCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    const comment = await createComment(req.body);
    res.status(201).json({ message: "Comment created Successfully", comment });
  } catch (err) { next(err); }
}

export async function getCommentsController(_req: Request, res: Response, next: NextFunction) {
  try {
    const comments = await getComments();
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
    const comment = await updateComment(req.params.id as string, req.body);
    res.json({ message: "Comment updated Successfully", comment });
  } catch (err) { next(err); }
}

export async function deleteCommentController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteComment(req.params.id as string);
    res.json({ message: "Comment deleted Successfully" });
  } catch (err) { next(err); }
}