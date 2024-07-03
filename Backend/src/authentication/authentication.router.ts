import { Hono } from "hono";
import { listAuth, getAuth, createAuth, updateAuth, deleteAuth } from "./authentication.controller";

export const authRouter = new Hono();

// GET all authentication entries - /api/auth
authRouter.get("/auth", listAuth);

// GET a single authentication entry by user ID - /api/auth/:userId
authRouter.get("/auth/:userId", getAuth);

// POST create a new authentication entry - /api/auth
authRouter.post("/auth", createAuth);

// PUT update an authentication entry by user ID - /api/auth/:userId
authRouter.put("/auth/:userId", updateAuth);

// DELETE an authentication entry by user ID - /api/auth/:userId
authRouter.delete("/auth/:userId", deleteAuth);
