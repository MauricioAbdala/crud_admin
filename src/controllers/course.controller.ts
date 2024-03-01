import { Request, Response } from "express";
import { Course } from "../interfaces/course.interface";
import { createCourseService, readAllCoursesService } from "../services/course.services";
import { readAllEnrollUsersService } from "../services/course.services";

export const createCourseController = async (req: Request, res: Response): Promise<Response> => {
  const course: Course = await createCourseService(req.body);
  return res.status(201).json(course);
};

export const readAllCoursesController = async (req: Request, res: Response): Promise<Response> => {
  const getAllCourses: Course[] = await readAllCoursesService();
  return res.status(200).json(getAllCourses);
};

export const readAllEnrollUsersController = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id);
  const courses = await readAllEnrollUsersService(id);

  return res.status(200).json(courses);
};