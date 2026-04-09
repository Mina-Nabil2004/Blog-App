import { Request, Response } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../services/postService.js";

export function getPostsController(req: Request, res: Response) {
  res.status(200).json({ posts: getPosts() });
}

export function getPostController(req: Request, res: Response) {
  res.status(200).json({ post: getPost(req.params.id as string) });
}

export function createPostController(req: Request, res: Response) {
    res.status(201).json({ 
        message: "Post created successfully",
        post: createPost(req.body)
    });
}

export function updatePostController(req: Request, res: Response) {
    res.status(200).json({ 
        message: "Post updated successfully", 
        post: updatePost(req.params.id as string, req.body) 
    });
}

export function deletePostController(req: Request, res: Response) {
    deletePost(req.params.id as string);
    res.status(200).json({ message: "Post deleted successfully" });
}