import { z } from "zod";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50).min(3),
  email: z.string().max(50).refine((value) => emailRegex.test(value), {
    message: "Invalid email",
  }),
  password: z.string().max(120).min(4),
  admin: z.boolean().default(false),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userReturnSchema = userSchema.omit({ password: true });
export const userUpdateSchema = userCreateSchema.partial();

export const userAllRead = userReturnSchema.array();

