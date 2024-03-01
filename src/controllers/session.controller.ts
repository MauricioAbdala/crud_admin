import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interface";
import { loginService } from "../services/session.services";

export const loginController = async (req: Request, res: Response): Promise<Response> => {
    const token: SessionReturn = await loginService(req.body);
    return res.status(200).json(token);
};