import ApiError from "../errors/ApiError.js";
import type { Comment, CommentCreate, CommentUpdate } from "../schemas/commentSchema.js";
import prisma from "../lib/prisma.js";

export async function createComment(data: CommentCreate): Promise<Comment> {
  return await prisma.comment.create({ data });
}

export async function getComments(): Promise<Comment[]> {
  return await prisma.comment.findMany();
}

export async function getComment(id: string): Promise<Comment> {
  const comment = await prisma.comment.findUnique({ where: { commentID: id } });
  if (!comment) throw ApiError.notFound({ id: `Comment ${id} not found` });
  return comment;
}

export async function updateComment(id: string, data: CommentUpdate): Promise<Comment> {
  try {
    return await prisma.comment.update({ where: { commentID: id }, data });
  } catch {
    throw ApiError.notFound({ id: `Comment ${id} not found` });
  }
}

export async function deleteComment(id: string): Promise<void> {
  try {
    await prisma.comment.delete({ where: { commentID: id } });
  } catch {
    throw ApiError.notFound({ id: `Comment ${id} not found` });
  }
}
