import { Hono } from "hono";
import { listBranches, getBranch, createBranch, updateBranch, deleteBranch } from "./branches.controller";

export const branchesRouter = new Hono();

// GET all branches - /api/branches
branchesRouter.get("/branches", listBranches);

// GET a single branch by ID - /api/branches/:id
branchesRouter.get("/branches/:id", getBranch);

// POST create a new branch - /api/branches
branchesRouter.post("/branches", createBranch);

// PUT update a branch by ID - /api/branches/:id
branchesRouter.put("/branches/:id", updateBranch);

// DELETE a branch by ID - /api/branches/:id
branchesRouter.delete("/branches/:id", deleteBranch);
