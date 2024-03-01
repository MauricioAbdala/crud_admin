import { Router } from "express";
import { createCourseController, readAllCoursesController, readAllEnrollUsersController } from "../controllers/course.controller";
import { validateBody } from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/courses.schemas";
import { disableUserController, enrollUserCourseController } from "../controllers/userCourse.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { verifyPermissions } from "../middlewares/verifyPermissions.middleware";

export const courseRouter: Router = Router();

courseRouter.post('/', verifyToken, verifyPermissions, validateBody(courseCreateSchema), createCourseController);
courseRouter.post('/:courseId/users/:userId', verifyToken, verifyPermissions, enrollUserCourseController);

courseRouter.get('/', readAllCoursesController);
courseRouter.get('/:id/users', verifyToken, verifyPermissions, readAllEnrollUsersController);

courseRouter.delete('/:courseId/users/:userId', verifyToken, verifyPermissions, disableUserController);