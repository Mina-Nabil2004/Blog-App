import ApiError from "../errors/ApiError.js";
import type { User, UserCreate, UserPublic, UserUpdate, UserChangePassword, UserChangeRole } from "../schemas/userSchema.js";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function createUser(userData: UserCreate): Promise<UserPublic> {
    const emailTaken = await prisma.user.findUnique({ where: { email: userData.email } });
    if (emailTaken)
        throw ApiError.badRequest({ email: `Email ${userData.email} is already taken` });

    const createdUser = await prisma.user.create({ data: userData });
    return omitPassword(createdUser);
}

export function omitPassword(user: User): UserPublic {
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function getUsers(): Promise<UserPublic[]> {
    const users = await prisma.user.findMany();
    return users.map(omitPassword);
}

export async function getUser(id: string): Promise<UserPublic> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    return omitPassword(user);
}

export async function updateUser(id: string, updatedUser: UserUpdate): Promise<UserPublic> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    if (updatedUser.email) {
        const emailTaken = await prisma.user.findUnique({ where: { email: updatedUser.email } });
        if (emailTaken) throw ApiError.badRequest({ email: "Email already taken" });
    }

    const updated = await prisma.user.update({ where: { userID: id }, data: updatedUser });
    return omitPassword(updated);
}

export async function changePassword(id: string, data: UserChangePassword): Promise<void> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    const isValid = await bcrypt.compare(data.currentPassword, user.passwordHash);
    if (!isValid) 
        throw ApiError.unauthorized({ currentPassword: "Current password is incorrect" });

    const newHash = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({ where: { userID: id }, data: { passwordHash: newHash } });
}

export async function changeRole(id: string, data: UserChangeRole): Promise<UserPublic> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    const updated = await prisma.user.update({ where: { userID: id }, data: { role: data.role } });
    return omitPassword(updated);
}

export async function getUserBlogs(id: string) {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    return await prisma.blog.findMany({ where: { authorID: id } });
}

export async function getUserComments(id: string) {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });

    return await prisma.comment.findMany({ where: { authorID: id } });
}

export async function deleteUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) 
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    
    await prisma.user.delete({ where: { userID: id } });
}