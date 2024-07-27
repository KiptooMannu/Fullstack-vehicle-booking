import { Hono } from 'hono'
import { loginUser, registerUser } from "./auth.controller";
import { loginUserSchema } from '../validators';
import { zValidator } from '@hono/zod-validator'

export const authorRouter = new Hono();

authorRouter.post("/register", registerUser);
authorRouter.post('/login', zValidator('json', loginUserSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), loginUser)

export default authorRouter;
