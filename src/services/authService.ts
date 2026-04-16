import ApiError from "../errors/ApiError";
import type { User, UserCreate, UserLogin, UserPublic, LoginResponse } from "../schemas/userSchema.js";
import { PrismaClient } from "../generated/prisma/client.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, omitPassword } from "./userService";
const prisma = new PrismaClient();

export async function signupUser(userData: UserCreate): Promise<UserPublic> {
    const emailTaken = await prisma.user.findUnique({ where: { email: userData.email } });
    if (emailTaken) {
        throw ApiError.badRequest({ email: `Email ${userData.email} is already taken` });
    }

    const passwordHash = await bcrypt.hash(userData.passwordHash, 10);
    const user = await createUser({ name: userData.name, email: userData.email, passwordHash });

    return user;
}

export async function loginUser(userData: UserLogin): Promise<LoginResponse> {
    const user = await prisma.user.findUnique({ where: { email: userData.email } });
    if (!user) {
        throw ApiError.unauthorized({ email: `User with email ${userData.email} not found` });
    }

    const isPasswordValid = await bcrypt.compare(userData.passwordHash, user.passwordHash);
    if (!isPasswordValid) {
        throw ApiError.unauthorized({ password: "Invalid password" });
    }

    const accessToken = jwt.sign({ userID: user.userID, role: user.role }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userID: user.userID, role: user.role }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "7d" });
    await prisma.refreshToken.create({ data: { token: refreshToken, userID: user.userID, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });

    const userPublic = omitPassword(user);

    return {
        user: userPublic,
        accessToken,
        refreshToken
    };
}

export async function logoutUser(refreshToken: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
}

export async function refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    const storedToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!storedToken) {
        throw ApiError.unauthorized({ refreshToken: "Invalid refresh token" });
    }
    if (storedToken.expiresAt < new Date()) {
        await prisma.refreshToken.delete({ where: { token: refreshToken } });
        throw ApiError.unauthorized({ refreshToken: "Refresh token expired" });
    }
    const user = await prisma.user.findUnique({ where: { userID: storedToken.userID } });
    if (!user) {
        throw ApiError.notFound({ userID: `User with ID ${storedToken.userID} not found` });
    }
    const accessToken = jwt.sign({ userID: user.userID, role: user.role }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });
    return { accessToken };
}