import { z } from "zod";
import { enrollUserCourseSchema, userCourseEnrollSchema, userCourseSchema } from "../schemas/userCourses.schemas";

export type UserCourse = z.infer<typeof userCourseSchema>;
export type EnrollUserCourse = z.infer<typeof enrollUserCourseSchema>;
export type UserCourseEnroll = z.infer<typeof userCourseEnrollSchema>;