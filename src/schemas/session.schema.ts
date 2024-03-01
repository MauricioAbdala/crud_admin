import { userSchema } from "./users.schemas";

export const sessionSchema = userSchema.pick({
    email: true,
    password: true
});