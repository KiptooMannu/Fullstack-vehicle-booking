import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authenticationSchema } from "../validators"; // Assuming you have an authSchema defined for validation
import { getAuth, createAuth, updateAuth, deleteAuth } from "./authentication.controller";

export const authRouter = new Hono();

// GET authentication details by user ID - /api/auth/:user_id
authRouter.get("/auth/:user_id", getAuth);

// POST create a new authentication entry - /api/auth
authRouter.post("/auth", zValidator("json", authenticationSchema), createAuth);

// PUT update authentication details by user ID - /api/auth/:user_id
authRouter.put("/auth/:user_id", zValidator("json", authenticationSchema), updateAuth);

// DELETE an authentication entry by user ID - /api/auth/:user_id
authRouter.delete("/auth/:user_id", deleteAuth);
