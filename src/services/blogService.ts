import ApiError from "../errors/ApiError.js";
import type { Blog, BlogCreate, BlogUpdate } from "../schemas/blogSchema.js";
import prisma from "../lib/prisma.js";

export async function createBlog(blogData: BlogCreate): Promise<Blog> {
    const author = await prisma.user.findUnique({ where: { userID: blogData.authorID } });
    if (!author) {
        throw ApiError.badRequest({ authorID: `Author with id ${blogData.authorID} does not exist` });
    }
    const newBlog = await prisma.blog.create({ data: blogData });
    return newBlog;
}

export async function getBlogs(): Promise<Blog[]> {
    return await prisma.blog.findMany();
}

export async function getBlog(id: string): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) {
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    return blog;
}

export async function updateBlog(id: string, updatedBlog: BlogUpdate): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) {
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    const updated = await prisma.blog.update({ where: { blogID: id }, data: updatedBlog });
    return updated;
}

export async function deleteBlog(id: string): Promise<void> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) {

        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    await prisma.blog.delete({ where: { blogID: id } });
}