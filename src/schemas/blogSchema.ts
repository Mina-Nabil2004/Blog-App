import { z } from "zod";

export const BlogSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3, "Title is required"),
    content: z.string().min(5, "Content must be at least 5 characters long"),
    authorId: z.string().uuid("authorId must be a valid UUID"),
});

export const BlogCreateSchema = BlogSchema.omit({ id: true });
export const BlogUpdateSchema = BlogSchema.partial().omit({ id: true });

export type Blog = z.infer<typeof BlogSchema>;
export type BlogCreate = z.infer<typeof BlogCreateSchema>;
export type BlogUpdate = z.infer<typeof BlogUpdateSchema>;