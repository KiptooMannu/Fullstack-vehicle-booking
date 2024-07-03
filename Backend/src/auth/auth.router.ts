import { Hono } from 'hono'
import { registerUser } from "./auth.controller";

export const authorRouter = new Hono();

authorRouter.post("/register", registerUser);

export default authorRouter;
