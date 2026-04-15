import ApiError from "../errors/ApiError.js";
import type { Blog, BlogCreate, BlogUpdate } from "../schemas/blogSchema.js";
const blogs: Blog[] = [];

export function createBlog(userData: BlogCreate): Blog {
    const newblog: Blog = {...userData, id: crypto.randomUUID()};
    blogs.push(newblog);
    return newblog;
}

export function getBlogs(): Blog[] {
    return blogs.map(blog => ({ ...blog }));
}

export function getBlog(id: string): Blog {
    const blog = blogs.find(blog => blog.id === id);
    if (!blog) {
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    return blog;
}

export function updateBlog(id: string, updatedBlog: BlogUpdate): Blog {
    const blog = blogs.find(blog => blog.id === id);
    if (!blog) {
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    Object.assign(blog, updatedBlog);
    return blog;
}

export function deleteBlog(id: string): void {
    const index = blogs.findIndex(blog => blog.id === id);
    if (index === -1) {
        throw ApiError.notFound({ id: `Blog with id ${id} not found` });
    }
    blogs.splice(index, 1);
}