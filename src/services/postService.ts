import ApiError from "../errors/ApiError.js";
import type { Post, PostCreate, PostUpdate } from "../schemas/postSchema.js";
const posts: Post[] = [];

export function createPost(userData: PostCreate): Post {
    const newPost: Post = {...userData, id: crypto.randomUUID()};
    posts.push(newPost);
    return newPost;
}

export function getPosts(): Post[] {
    return posts;
}

export function getPost(id: string): Post {
    const post = posts.find(post => post.id === id);
    if (!post) {
        throw ApiError.notFound({ id: `Post with id ${id} not found` });
    }
    return post;
}

export function updatePost(id: string, updatedPost: PostUpdate): Post {
    const post = posts.find(post => post.id === id);
    if (!post) {
        throw ApiError.notFound({ id: `Post with id ${id} not found` });
    }
    Object.assign(post, updatedPost);
    return post;
}

export function deletePost(id: string): void {
    const index = posts.findIndex(post => post.id === id);
    if (index === -1) {
        throw ApiError.notFound({ id: `Post with id ${id} not found` });
    }
    posts.splice(index, 1);
}