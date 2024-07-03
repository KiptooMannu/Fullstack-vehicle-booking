import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBranch, TSBranch, BranchesTable } from "../drizzle/schema";

// Service to fetch branches
export const branchesService = async (limit?: number): Promise<TSBranch[] | null> => {
    if (limit) {
        return await db.query.BranchesTable.findMany({
            limit: limit
        });
    }
    return await db.query.BranchesTable.findMany();
}

// Service to fetch a single branch by ID
export const getBranchService = async (id: number): Promise<TSBranch | undefined> => {
    return await db.query.BranchesTable.findFirst({
        where: eq(BranchesTable.branchId, id)
    });
}

// Service to create a new branch
export const createBranchService = async (branch: TIBranch) => {
    await db.insert(BranchesTable).values(branch);
    return "Branch created successfully";
}

// Service to update a branch by ID
export const updateBranchService = async (id: number, branch: Partial<TIBranch>) => {
    await db.update(BranchesTable).set(branch).where(eq(BranchesTable.branchId, id));
    return "Branch updated successfully";
}

// Service to delete a branch by ID
export const deleteBranchService = async (id: number) => {
    await db.delete(BranchesTable).where(eq(BranchesTable.branchId, id));
    return "Branch deleted successfully";
}
