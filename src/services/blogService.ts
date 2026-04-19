import ApiError from "../errors/ApiError.js";
import type { Blog, BlogCreate, BlogUpdate } from "../schemas/blogSchema.js";
import prisma from "../lib/prisma.js";

export async function createBlog(blogData: BlogCreate): Promise<Blog> {
    const author = await prisma.user.findUnique({ where: { userID: blogData.authorID } });
    if (!author)
        throw ApiError.badRequest({ authorID: `Author with id ${blogData.authorID} does not exist` });

    return await prisma.blog.create({ data: blogData });
}

export async function getBlogs(): Promise<Blog[]> {
    return await prisma.blog.findMany();
}

export async function getPublishedBlogs(): Promise<Blog[]> {
    return await prisma.blog.findMany({ where: { published: true } });
}

export async function getBlogsByUser(userID: string): Promise<Blog[]> {
    const user = await prisma.user.findUnique({ where: { userID } });
    if (!user) 
        throw ApiError.notFound({ userID: `User with id ${userID} not found` });

    return await prisma.blog.findMany({ where: { authorID: userID } });
}

export async function getBlog(id: string): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) 
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });

    return blog;
}

export async function updateBlog(id: string, updatedBlog: BlogUpdate): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) 
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });

    return await prisma.blog.update({ where: { blogID: id }, data: updatedBlog });
}

export async function publishBlog(id: string, authorID: string): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) 
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });

    if (blog.authorID !== authorID) 
        throw ApiError.forbidden({ blog: "You are not the author of this blog" });

    if (blog.published) 
        throw ApiError.badRequest({ blog: "Blog is already published" });

    return await prisma.blog.update({ where: { blogID: id }, data: { published: true } });
}

export async function unpublishBlog(id: string, authorID: string): Promise<Blog> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) 
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });

    if (blog.authorID !== authorID) 
        throw ApiError.forbidden({ blog: "You are not the author of this blog" });
    
    if (!blog.published) 
        throw ApiError.badRequest({ blog: "Blog is already unpublished" });

    return await prisma.blog.update({ where: { blogID: id }, data: { published: false } });
}

export async function deleteBlog(id: string, authorID: string, role: string): Promise<void> {
    const blog = await prisma.blog.findUnique({ where: { blogID: id } });
    if (!blog) 
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });

    if (blog.authorID !== authorID && role !== 'ADMIN') 
        throw ApiError.forbidden({ blog: "You are not the author of this blog" });
    
    await prisma.blog.delete({ where: { blogID: id } });
}