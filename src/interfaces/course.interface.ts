import { z } from "zod";
import { courseCreateSchema, courseSchema } from "../schemas/courses.schemas";
import { QueryResult } from "pg";

export type Course = z.infer<typeof courseSchema>;

export type CourseCreate = Zod.infer<typeof courseCreateSchema>;
export type CourseRead = Array<Course>;

export type CourseResult = QueryResult<Course>;