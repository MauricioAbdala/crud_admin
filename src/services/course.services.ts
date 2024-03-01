import format from "pg-format";
import { Course, CourseCreate, CourseResult } from "../interfaces/course.interface";
import { client } from "../database";
import { UserCourseEnroll } from "../interfaces/userCourses.interface";
import { QueryResult } from "pg";
import AppError from "../errors/App.error";

export const createCourseService = async (payload: CourseCreate): Promise<Course> => {
    const queryFormat: string = format(
        'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );

    const query: CourseResult = await client.query(queryFormat);
    return query.rows[0];
};



export const readAllCoursesService = async (): Promise<Course[]> => {
    const queryResult: CourseResult = await client.query(`SELECT * FROM "courses";`);
    return queryResult.rows;
};

export const readAllEnrollUsersService = async (id: number): Promise<UserCourseEnroll[]> => {
    const queryGetCoursesId: QueryResult = await client.query(
        `
        SELECT 
            "u".id AS "userId",
            "u".name AS "userName",
            "c".id AS "courseId",
            "c".name AS "courseName",
            "c".description AS "courseDescription",
            "uC".active AS "userActiveInCourse"
        FROM 
            users "u"
        JOIN
            "userCourses" "uC" ON "u".id = "uC"."userId"
        JOIN 
            courses "c" ON "c".id = "uC"."courseId"
        WHERE 
            "c".id = $1;
 
        `,
        [id]
    );
    if (queryGetCoursesId.rowCount === 0) {
        throw new AppError("User/course not found", 404);
    };
    return queryGetCoursesId.rows;
}; 