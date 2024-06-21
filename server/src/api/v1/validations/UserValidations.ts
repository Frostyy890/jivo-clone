import { z } from "zod";
import { Role } from "../../../database/models/User";

export const createUserSchema = z.object({
  username: z.string().min(6, { message: "Must be at least 6 characters long" }),
  email: z.string().email({ message: "Must be valid" }),
  password: z
    .string()
    .min(6, { message: "Must be at least 6 characters long" })
    .max(32, { message: "Must be at most 32 characters long" }),
  roles: z.array(z.enum([Role.SUPERADMIN, Role.ADMIN, Role.USER])).optional(),
  refreshToken: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();
export const registerUserSchema = createUserSchema.omit({ roles: true, refreshToken: true });
export const loginUserSchema = registerUserSchema.omit({ username: true });

export type CreateUserData = z.infer<typeof createUserSchema>;
export type RegisterUserData = z.infer<typeof registerUserSchema>;
export type LoginUserData = z.infer<typeof loginUserSchema>;
