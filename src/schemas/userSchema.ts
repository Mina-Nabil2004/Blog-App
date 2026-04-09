import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const UserCreateSchema = UserSchema.omit({ id: true });
export const UserUpdateSchema = UserSchema.partial().omit({ id: true });
export const UserPublicSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;
export type UserPublic = z.infer<typeof UserPublicSchema>;