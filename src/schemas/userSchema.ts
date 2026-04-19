import { z } from "zod";

export const UserSchema = z.object({
    userID: z.string().uuid(),
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    passwordHash: z.string().min(8, "Password must be at least 8 characters long"),
    role: z.enum(['BASIC', 'ADMIN']),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const UserCreateSchema = UserSchema.omit({ userID: true, role: true, createdAt: true, updatedAt: true })
export const UserUpdateSchema = UserSchema.partial().omit({ userID: true, createdAt: true, updatedAt: true });
export const UserPublicSchema = UserSchema.omit({ passwordHash: true});
export const UserLoginSchema = UserSchema.pick({ email: true}).extend({ password: z.string().min(8, "Password must be at least 8 characters long") });
export const UserSignupSchema = UserLoginSchema.extend({ name: z.string().min(3, "Name is required") });

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserPublic = z.infer<typeof UserPublicSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserSignup = z.infer<typeof UserSignupSchema>;

export type LoginResponse = {
    user: UserPublic;
    accessToken: string;
    refreshToken: string;
};