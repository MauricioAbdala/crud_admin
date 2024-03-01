import { QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors/App.error";

export const enrollUserCourseService = async (courseId: number, userId: number): Promise<object> => {

    const queryCourse: QueryResult = await client.query(
        'SELECT * FROM "courses" WHERE "id" = $1', [courseId]
    );
    const queryUser: QueryResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1', [userId]
    );

    if (queryCourse.rowCount === 0) {
        throw new AppError("User/course not found", 404);
    };
    if (queryUser.rowCount === 0) {
        throw new AppError("User/course not found", 404);
    };

    await client.query(
        'INSERT INTO "userCourses" ("userId", "courseId") VALUES ($1, $2);',
        [userId, courseId]
    );

    const result = {
        "message": "User successfully vinculed to course"
    };

    return result;
};


export const disableUserService = async (courseId: number, userId: number): Promise<void> => {
    const queryCourse: QueryResult = await client.query(
        `SELECT * FROM "courses" WHERE "id" = $1`, [courseId]
    );
    const queryUser: QueryResult = await client.query(
        `SELECT * FROM "users" WHERE "id" = $1`, [userId]
    );

    if (queryCourse.rowCount === 0) {
        throw new AppError("User/course not found", 404);
    };
    if (queryUser.rowCount === 0) {
        throw new AppError("User/course not found", 404);
    };

    await client.query(
        `
        UPDATE 
            "userCourses"
        SET 
            "active" = FALSE
        WHERE
            "courseId" = $1 AND "userId" = $2;
        `, [courseId, userId]
    );
};





