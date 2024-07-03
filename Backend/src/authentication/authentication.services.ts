import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAuth, TSAuth, AuthenticationTable } from "../drizzle/schema";

// Service to fetch authentication entries
export const authService = async (limit?: number): Promise<TSAuth[] | null> => {
    if (limit) {
        return await db.query.AuthenticationTable.findMany({
            limit: limit
        });
    }
    return await db.query.AuthenticationTable.findMany();
}

// Service to fetch a single authentication entry by user ID
export const getAuthService = async (userId: number): Promise<TSAuth | undefined> => {
    return await db.query.AuthenticationTable.findFirst({
        where: eq(AuthenticationTable.userId, userId)
    });
}

// Service to create a new authentication entry
export const createAuthService = async (auth: TIAuth) => {
    await db.insert(AuthenticationTable).values(auth);
    return "Authentication entry created successfully";
}

// Service to update an authentication entry by user ID
export const updateAuthService = async (userId: number, auth: Partial<TIAuth>) => {
    await db.update(AuthenticationTable).set(auth).where(eq(AuthenticationTable.userId, userId));
    return "Authentication entry updated successfully";
}

// Service to delete an authentication entry by user ID
export const deleteAuthService = async (userId: number) => {
    await db.delete(AuthenticationTable).where(eq(AuthenticationTable.userId, userId));
    return "Authentication entry deleted successfully";
}
