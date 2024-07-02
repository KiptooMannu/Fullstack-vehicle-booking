import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators"; // Assuming you have a userSchema defined for validation
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./users.controller";

export const userRouter = new Hono();

// GET all users - /api/users
userRouter.get("/users", listUsers);

// GET a single user by ID - /api/users/:id
userRouter.get("/users/:id", getUser);

// POST create a new user - /api/users
userRouter.post("/users", zValidator("json", userSchema), createUser);

// PUT update a user by ID - /api/users/:id
userRouter.put("/users/:id", zValidator("json", userSchema), updateUser);

// DELETE a user by ID - /api/users/:id
userRouter.delete("/users/:id", deleteUser);
