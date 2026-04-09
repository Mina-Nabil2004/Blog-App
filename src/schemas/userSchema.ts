import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type User = z.infer<typeof UserSchema>;