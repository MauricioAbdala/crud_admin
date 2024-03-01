import format from "pg-format";
import { UserAllRead, UserCreate, UserResult, UserReturn } from "../interfaces/user.interface";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userAllRead, userReturnSchema } from "../schemas/users.schemas";
import AppError from "../errors/App.error";
import { QueryResult } from "pg";
import { UserCourseEnroll } from "../interfaces/userCourses.interface";

export const createUserService = async (payload: UserCreate): Promise<UserReturn> => {

    payload.password = await hash(payload.password, 10);

    const queryFormat: string = format(
        'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
        Object.keys(payload),
        Object.values(payload)
    );

    const queryResult: UserResult = await client.query(queryFormat);
    return userReturnSchema.parse(queryResult.rows[0]);
};

export const readAllUsersService = async (): Promise<UserAllRead> => {
    const query: UserResult = await client.query(`SELECT * FROM "users";`);
    return userAllRead.parse(query.rows);
};



export const readUserCourse = async (id: number): Promise<UserCourseEnroll[]> => {
    const queryGetCoursesId: QueryResult = await client.query(
        `
        SELECT 
            "c".id AS "courseId",
            "c".name AS "courseName",
            "c".description AS "courseDescription",
            "uC".active AS "userActiveInCourse",
            "u".id AS "userId",
            "u".name AS "userName"
        FROM 
            courses "c"
        JOIN
            "userCourses" "uC" ON "c".id = "uC"."courseId"
        JOIN 
            users "u" ON "u".id = "uC"."userId"
        WHERE 
            "u".id = $1;
        `,
        [id]

    );
    if (queryGetCoursesId.rowCount === 0) {
        throw new AppError("No course found", 404);
    };
    return queryGetCoursesId.rows;

};