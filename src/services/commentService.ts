import ApiError from "../errors/ApiError.js";
import type { Comment, CommentCreate, CommentUpdate } from "../schemas/commentSchema.js";
import prisma from "../lib/prisma.js";

export async function createComment(data: CommentCreate): Promise<Comment> {
    return await prisma.comment.create({ data });
}

export async function getComments(): Promise<Comment[]> {
    return await prisma.comment.findMany();
}

export async function getCommentsByBlog(blogID: string): Promise<Comment[]> {
    const blog = await prisma.blog.findUnique({ where: { blogID } });
    if (!blog) throw ApiError.notFound({ blogID: `Blog with id ${blogID} not found` });
    return await prisma.comment.findMany({ where: { blogID } });
}

export async function getCommentsByUser(userID: string): Promise<Comment[]> {
    const user = await prisma.user.findUnique({ where: { userID } });
    if (!user) throw ApiError.notFound({ userID: `User with id ${userID} not found` });
    return await prisma.comment.findMany({ where: { authorID: userID } });
}

export async function getComment(id: string): Promise<Comment> {
    const comment = await prisma.comment.findUnique({ where: { commentID: id } });
    if (!comment) throw ApiError.notFound({ id: `Comment ${id} not found` });
    return comment;
}

export async function updateComment(id: string, data: CommentUpdate, authorID: string): Promise<Comment> {
    const comment = await prisma.comment.findUnique({ where: { commentID: id } });
    if (!comment) throw ApiError.notFound({ id: `Comment ${id} not found` });
    if (comment.authorID !== authorID) throw ApiError.forbidden({ comment: "You are not the author of this comment" });
    return await prisma.comment.update({ where: { commentID: id }, data });
}

export async function deleteComment(id: string, authorID: string, role: string): Promise<void> {
    const comment = await prisma.comment.findUnique({ where: { commentID: id } });
    if (!comment) throw ApiError.notFound({ id: `Comment ${id} not found` });
    if (comment.authorID !== authorID && role !== 'ADMIN') {
        throw ApiError.forbidden({ comment: "You are not the author of this comment" });
    }
    await prisma.comment.delete({ where: { commentID: id } });
}