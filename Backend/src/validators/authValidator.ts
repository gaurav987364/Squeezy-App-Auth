import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(2).max(20),
    email: z.string().trim().min(2).max(25).email(),
    password: z.string().trim().min(6).max(12),
    confirmPassword: z.string().trim().min(6).max(12),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords Do Not Match.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().min(6).max(25).email(),
  password: z.string().trim().min(6).max(12),
  userAgent: z.string().optional(),
});
