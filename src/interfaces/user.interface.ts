import { z } from "zod";
import { userAllRead, userCreateSchema, userReturnSchema, userSchema, userUpdateSchema } from "../schemas/users.schemas";
import { QueryResult } from "pg";

export type User = z.infer<typeof userSchema>;

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserRead = Array<User>;

export type UserAllRead = z.infer<typeof userAllRead>;

export type UserUpdate = z.infer<typeof userUpdateSchema>;

export type UserResult = QueryResult<User>;
export type UserReturnAll = QueryResult<User>;

