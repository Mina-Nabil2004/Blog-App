import { z } from "zod";

export const PostSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3, "Title is required"),
    content: z.string().min(10, "Content must be at least 10 characters long"),
    authorId: z.string().uuid(),
});

export type Post = z.infer<typeof PostSchema>;