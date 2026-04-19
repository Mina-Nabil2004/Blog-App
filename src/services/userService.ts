import ApiError from "../errors/ApiError.js";
import type { User, UserCreate, UserPublic, UserUpdate } from "../schemas/userSchema.js";
import prisma from "../lib/prisma.js";

export async function createUser(userData: UserCreate): Promise<UserPublic> {
    const emailTaken = await prisma.user.findUnique({ where: { email: userData.email } });
    if (emailTaken) 
        throw ApiError.badRequest({ email: `Email ${userData.email} is already taken` });
    const newUser: UserCreate = {...userData};
    const createdUser = await prisma.user.create({ data: newUser });
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
    if (!user) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    return omitPassword(user);
}

export async function updateUser(id: string, updatedUser: UserUpdate): Promise<UserPublic> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    if (updatedUser.email) {
        const emailTaken = await prisma.user.findUnique({ where: { email: updatedUser.email } });
        if (emailTaken) {
            throw ApiError.badRequest({ email: "Email already taken" });
        }
    }
    const updated = await prisma.user.update({ where: { userID: id }, data: updatedUser });
    return omitPassword(updated);
}

export async function deleteUser(id: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) {
        throw ApiError.notFound({ id: `User with id ${id} not found` });
    }
    await prisma.user.delete({ where: { userID: id } });
}