import { z } from "zod";

export const CommentSchema = z.object({
    commentID: z.string().uuid(),
    content: z.string().min(1, "Content is required"),
    authorID: z.string().uuid("authorId must be a valid UUID"),
    blogID: z.string().uuid("blogId must be a valid UUID"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const CommentCreateSchema = CommentSchema.omit({ commentID: true, createdAt: true, updatedAt: true });
export const CommentUpdateSchema = CommentSchema.partial().omit({ commentID: true, createdAt: true, updatedAt: true });

export type Comment = z.infer<typeof CommentSchema>;
export type CommentCreate = z.infer<typeof CommentCreateSchema>;
export type CommentUpdate = z.infer<typeof CommentUpdateSchema>;