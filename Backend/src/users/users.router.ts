import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators"; // Assuming you have a userSchema defined for validation
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./users.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middlewear/bearAuth";

export const userRouter = new Hono();

// GET all users - /api/users
userRouter.get("/users", adminOrUserRoleAuth ,listUsers);

// GET a single user by ID - /api/users/:id
userRouter.get("/users/:id",adminOrUserRoleAuth , getUser);

// POST create a new user - /api/users
userRouter.post("/users",adminOrUserRoleAuth, createUser);

// PUT update a user by ID - /api/users/:id
userRouter.put("/users/:id",adminOrUserRoleAuth,updateUser);

// DELETE a user by ID - /api/users/:id
userRouter.delete("/users/:id",adminOrUserRoleAuth, deleteUser);
