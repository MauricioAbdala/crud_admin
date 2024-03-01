import { Request, Response } from "express";
import { disableUserService, enrollUserCourseService } from "../services/userCourses.services";

export const enrollUserCourseController = async (req: Request, res: Response): Promise<Response> => {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const userCourse = await enrollUserCourseService(userId, courseId);
    return res.status(201).json(userCourse);
};

export const disableUserController = async (req: Request, res: Response): Promise<Response> => {
    const courseId = Number(req.params.courseId);
    const userId = Number(req.params.userId);
    const disable = await disableUserService(courseId, userId);
    return res.status(204).json(disable);

};