import { z } from "zod";

export const PostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3, "Title is required"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
    authorId: z.string().uuid("authorId must be a valid UUID"),
});

export const PostCreateSchema = PostSchema.omit({ id: true });
export const PostUpdateSchema = PostSchema.partial().omit({ id: true });

export type Post = z.infer<typeof PostSchema>;
export type PostCreate = z.infer<typeof PostCreateSchema>;
export type PostUpdate = z.infer<typeof PostUpdateSchema>;