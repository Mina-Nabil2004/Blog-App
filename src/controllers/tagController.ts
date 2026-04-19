import { Request, Response, NextFunction } from "express";
import { createTag, deleteTag, getTag, getTags, updateTag, addTagToBlog, removeTagFromBlog, getBlogTags, getBlogsByTag } from "../services/tagService.js";

export async function getTagsController(_req: Request, res: Response, next: NextFunction) {
    try {
        const tags = await getTags();
        res.json({ tags });
    } catch (err) { next(err); }
}

export async function getTagController(req: Request, res: Response, next: NextFunction) {
    try {
        const tag = await getTag(req.params.id as string);
        res.json({ tag });
    } catch (err) { next(err); }
}

export async function createTagController(req: Request, res: Response, next: NextFunction) {
    try {
        const tag = await createTag(req.body);
        res.status(201).json({ 
            message: "Tag created successfully", 
            tag 
        });
    } catch (err) { next(err); }
}

export async function updateTagController(req: Request, res: Response, next: NextFunction) {
    try {
        const tag = await updateTag(req.params.id as string, req.body);
        res.json({ 
            message: "Tag updated successfully", 
            tag 
        });
    } catch (err) { next(err); }
}

export async function deleteTagController(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteTag(req.params.id as string);
        res.json({ message: "Tag deleted successfully" });
    } catch (err) { next(err); }
}

export async function addTagToBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        await addTagToBlog(req.params.blogID as string, req.params.tagID as string);
        res.json({ message: "Tag added to blog successfully" });
    } catch (err) { next(err); }
}

export async function removeTagFromBlogController(req: Request, res: Response, next: NextFunction) {
    try {
        await removeTagFromBlog(req.params.blogID as string, req.params.tagID as string);
        res.json({ message: "Tag removed from blog successfully" });
    } catch (err) { next(err); }
}

export async function getBlogTagsController(req: Request, res: Response, next: NextFunction) {
    try {
        const tags = await getBlogTags(req.params.blogID as string);
        res.json({ tags });
    } catch (err) { next(err); }
}

export async function getBlogsByTagController(req: Request, res: Response, next: NextFunction) {
    try {
        const blogs = await getBlogsByTag(req.params.id as string);
        res.json({ blogs });
    } catch (err) { next(err); }
}