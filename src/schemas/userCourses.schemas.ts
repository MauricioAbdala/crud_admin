import { z } from "zod";

export const userCourseSchema = z.object({
    id: z.number().positive(),
    active: z.boolean().default(true),
    userId: z.number().positive(),
    courseId: z.number().positive()
});

export const enrollUserCourseSchema = userCourseSchema.omit({
    id: true, active: true
});

export const userCourseEnrollSchema = z.object({
    userId: z.number().positive(),
    userName: z.string().max(50),
    courseId: z.number().positive(),
    courseName: z.string().max(15),
    courseDescription: z.string(),
    userActiveInCourse: z.boolean()
});