import express, { Application, json } from 'express';
import "dotenv/config";
import "express-async-errors";
import { routes } from './routes/index.router';
import { handleErrors } from './middlewares/handleError.middleware';

export const app: Application = express();

app.use(json());

app.use("/", routes);

app.use(handleErrors);

export default app;
