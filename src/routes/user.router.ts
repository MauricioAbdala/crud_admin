import { Router } from "express";
import { createUserController, readAllUserController, readUserCoursesController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema } from "../schemas/users.schemas";
import { verifyEmailExists } from "../middlewares/verifyUserEmailExists.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";

export const userRouter: Router = Router();

userRouter.post('/', validateBody(userCreateSchema), verifyEmailExists, createUserController);

userRouter.get('/', verifyToken, verifyPermissions, readAllUserController);
userRouter.get('/:id/courses', verifyToken, verifyPermissions, readUserCoursesController);
