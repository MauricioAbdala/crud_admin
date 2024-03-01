import { Request, Response } from "express";
import { UserAllRead, UserReturn } from "../interfaces/user.interface";
import { createUserService, readAllUsersService, readUserCourse } from "../services/user.services";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await createUserService(req.body);

  return res.status(201).json(user);
};

export const readAllUserController = async (req: Request, res: Response,): Promise<Response> => {
  const users: UserAllRead = await readAllUsersService();

  return res.status(200).json(users);
};

export const readUserCoursesController = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id);
  const getAllCourses = await readUserCourse(id);
  return res.status(200).json(getAllCourses);
};