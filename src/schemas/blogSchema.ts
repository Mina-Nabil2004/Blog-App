import { z } from "zod";

export const BlogSchema = z.object({
    blogID: z.string().uuid(),
    title: z.string().min(3, "Title is required"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
    authorID: z.string().uuid("authorId must be a valid UUID"),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const BlogCreateSchema = BlogSchema.omit({ blogID: true, createdAt: true, updatedAt: true });
export const BlogUpdateSchema = BlogSchema.partial().omit({ blogID: true, createdAt: true, updatedAt: true });

export type Blog = z.infer<typeof BlogSchema>;
export type BlogCreate = z.infer<typeof BlogCreateSchema>;
export type BlogUpdate = z.infer<typeof BlogUpdateSchema>;