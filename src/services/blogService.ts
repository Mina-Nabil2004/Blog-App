import ApiError from "../errors/ApiError.js";
import type { Blog, BlogCreate, BlogUpdate } from "../schemas/blogSchema.js";
import { PrismaClient } from "../generated/prisma/client.js";
const prisma = new PrismaClient();

export async function createBlog(userData: BlogCreate): Promise<Blog> {
    const newBlog = await prisma.blog.create({ data: userData });
    return newBlog;
}

export async function getBlogs(): Promise<Blog[]> {
    return (await prisma.blog.findMany()).map(blog => ({...blog}));
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
    Object.assign(blog, updatedBlog);
    return blog;
}

export async function deleteBlog(id: string): Promise<void> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) {

        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    await prisma.blog.delete({ where: { blogID: id } });
}