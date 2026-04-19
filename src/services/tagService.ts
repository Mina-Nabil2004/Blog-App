import ApiError from "../errors/ApiError.js";
import type { Tag, TagCreate, TagUpdate } from "../schemas/tagSchema.js";
import prisma from "../lib/prisma.js";

export async function createTag(data: TagCreate): Promise<Tag> {
    const existing = await prisma.tag.findUnique({ where: { name: data.name } });
    if (existing)
        throw ApiError.badRequest({ name: `Tag ${data.name} already exists` });
    
    return await prisma.tag.create({ data });
}

export async function getTags(): Promise<Tag[]> {
    return await prisma.tag.findMany();
}

export async function getTag(id: string): Promise<Tag> {
    const tag = await prisma.tag.findUnique({ where: { tagID: id } });
    if (!tag) 
        throw ApiError.notFound({ id: `Tag with id ${id} not found` });

    return tag;
}

export async function updateTag(id: string, data: TagUpdate): Promise<Tag> {
    const tag = await prisma.tag.findUnique({ where: { tagID: id } });
    if (!tag) 
        throw ApiError.notFound({ id: `Tag with id ${id} not found` });

    return await prisma.tag.update({ where: { tagID: id }, data });
}

export async function deleteTag(id: string): Promise<void> {
    const tag = await prisma.tag.findUnique({ where: { tagID: id } });
    if (!tag) 
        throw ApiError.notFound({ id: `Tag with id ${id} not found` });

    await prisma.tag.delete({ where: { tagID: id } });
}

export async function addTagToBlog(blogID: string, tagID: string): Promise<void> {
    const blog = await prisma.blog.findUnique({ where: { blogID } });
    if (!blog) 
        throw ApiError.notFound({ blogID: `Blog with id ${blogID} not found` });

    const tag = await prisma.tag.findUnique({ where: { tagID } });
    if (!tag) 
        throw ApiError.notFound({ tagID: `Tag with id ${tagID} not found` });

    const existing = await prisma.blogTag.findUnique({ where: { blogID_tagID: { blogID, tagID } } });
    if (existing) 
        throw ApiError.badRequest({ tag: "Tag already added to this blog" });

    await prisma.blogTag.create({ data: { blogID, tagID } });
}

export async function removeTagFromBlog(blogID: string, tagID: string): Promise<void> {
    const existing = await prisma.blogTag.findUnique({ where: { blogID_tagID: { blogID, tagID } } });
    if (!existing) 
        throw ApiError.notFound({ tag: "This tag is not associated with this blog" });

    await prisma.blogTag.delete({ where: { blogID_tagID: { blogID, tagID } } });
}

export async function getBlogTags(blogID: string): Promise<Tag[]> {
    const blog = await prisma.blog.findUnique({ where: { blogID } });
    if (!blog) 
        throw ApiError.notFound({ blogID: `Blog with id ${blogID} not found` });

    const blogTags = await prisma.blogTag.findMany({
        where: { blogID },
        include: { tag: true },
    });
    return blogTags.map((blogTag) => blogTag.tag);
}

export async function getBlogsByTag(tagID: string) {
    const tag = await prisma.tag.findUnique({ where: { tagID } });
    if (!tag) 
        throw ApiError.notFound({ tagID: `Tag with id ${tagID} not found` });

    const blogTags = await prisma.blogTag.findMany({
        where: { tagID },
        include: { blog: true },
    });
    return blogTags.map((blogTag) => blogTag.blog);
}