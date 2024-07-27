import { Hono } from "hono";
import { listBranches, getBranch, createBranch, updateBranch, deleteBranch } from "./branches.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middlewear/bearAuth";
import { branchSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const branchesRouter = new Hono();

// GET all branches - /api/branches
branchesRouter.get("/branches",adminOrUserRoleAuth , listBranches);

// GET a single branch by ID - /api/branches/:id
branchesRouter.get("/branches/:id",adminOrUserRoleAuth ,getBranch);

// POST create a new branch - /api/branches
branchesRouter.post("/branches",zValidator("json", branchSchema),adminRoleAuth , createBranch);

// PUT update a branch by ID - /api/branches/:id
branchesRouter.put("/branches/:id",adminRoleAuth ,updateBranch);

// DELETE a branch by ID - /api/branches/:id
branchesRouter.delete("/branches/:id",adminRoleAuth , deleteBranch);
