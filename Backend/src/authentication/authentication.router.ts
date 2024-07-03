import { Hono } from "hono";
import { listAuth, getAuth, createAuth, updateAuth, deleteAuth } from "./authentication.controller";
import { adminOrUserRoleAuth,adminRoleAuth } from "../middlewear/bearAuth";

export const authRouter = new Hono();

// GET all authentication entries - /api/auth
authRouter.get("/auth",adminRoleAuth, listAuth);

// GET a single authentication entry by user ID - /api/auth/:userId
authRouter.get("/auth/:userId",adminRoleAuth, getAuth);

// POST create a new authentication entry - /api/auth
authRouter.post("/auth", adminRoleAuth, createAuth);

// PUT update an authentication entry by user ID - /api/auth/:userId
authRouter.put("/auth/:userId",adminRoleAuth, updateAuth);

// DELETE an authentication entry by user ID - /api/auth/:userId
authRouter.delete("/auth/:userId",adminRoleAuth, deleteAuth);
