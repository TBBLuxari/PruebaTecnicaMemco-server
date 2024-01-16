import express, { Response as ExResponse, Request as ExRequest } from "express";
import swaggerUi from "swagger-ui-express";
import { urlencoded, json } from "express";
import { RegisterRoutes } from '../build/routes';
import { authMiddleware } from './middlewares/authMiddleware';
import cors from 'cors';


export const app = express();

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => 
{
  return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

app.use( urlencoded({extended: true}));
app.use(json());
app.use(cors());

app.use(authMiddleware.unless((req) => {
  return (
    req.path === '/users/login' ||
    req.path === '/users/register' ||
    req.path === '/auth/login' ||
    req.path === '/users/register' ||
    req.path === '/users' ||
    req.path.startsWith('/users/')||
    req.path === '/auth/reset-password' ||
    req.path === '/auth/verify'||
    req.path === '/auth/verify2'||
    req.path.startsWith('/auth/reset/')
  );
}));




RegisterRoutes(app);