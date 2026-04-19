import { z } from "zod";

export const TagSchema = z.object({
    tagID: z.string().uuid(),
    name: z.string().min(1, "Tag name is required"),
});

export const TagCreateSchema = TagSchema.omit({ tagID: true });
export const TagUpdateSchema = TagCreateSchema.partial();

export const BlogTagSchema = z.object({
    blogID: z.string().uuid(),
    tagID: z.string().uuid(),
});

export type Tag = z.infer<typeof TagSchema>;
export type TagCreate = z.infer<typeof TagCreateSchema>;
export type TagUpdate = z.infer<typeof TagUpdateSchema>;
export type BlogTag = z.infer<typeof BlogTagSchema>;