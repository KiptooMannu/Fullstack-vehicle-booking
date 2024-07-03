import { Context } from "hono";
import { branchesService, getBranchService, createBranchService, updateBranchService, deleteBranchService } from "./branches.services";

export const listBranches = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await branchesService(limit);

        if (data == null || data.length == 0) {
            return c.text("Branches not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getBranch = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const branch = await getBranchService(id);
    if (branch == undefined) {
        return c.text("Branch not found", 404);
    }
    return c.json(branch, 200);
}

export const createBranch = async (c: Context) => {
    try {
        const branch = await c.req.json();
        const createdBranch = await createBranchService(branch);

        if (!createdBranch) {
            return c.text("Branch not created", 404);
        }
        return c.json(createdBranch, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const updateBranch = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const branch = await c.req.json();
    try {
        const searchedBranch = await getBranchService(id);
        if (searchedBranch == undefined) return c.text("Branch not found", 404);

        const res = await updateBranchService(id, branch);
        if (!res) return c.text("Branch not updated", 404);

        return c.json({ msg: "Branch updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteBranch = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const branch = await getBranchService(id);
        if (branch == undefined) return c.text("Branch not found", 404);

        const res = await deleteBranchService(id);
        if (!res) return c.text("Branch not deleted", 404);

        return c.json({ msg: "Branch deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
