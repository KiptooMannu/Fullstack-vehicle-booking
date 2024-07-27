import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUser, TSUser, UsersTable } from "../drizzle/schema";

// Service to fetch users
export const usersService = async (limit?: number): Promise<TSUser[] | null> => {
    if (limit) {
        return await db.query.UsersTable.findMany({
            limit: limit
        });
    }
    return await db.query.UsersTable.findMany();
}

// Service to fetch a single user by ID
export const getUserService = async (id: number): Promise<TSUser | undefined> => {
    return await db.query.UsersTable.findFirst({
        where: eq(UsersTable.userId, id)
    });
}

// Service to create a new user
export const createUserService = async (user: TIUser): Promise<string> => {
    await db.insert(UsersTable).values(user);
    return "User created successfully";
}

// Service to update a user by ID
export const updateUserService = async (id: number, user: TIUser): Promise<string> => {
    await db.update(UsersTable).set(user).where(eq(UsersTable.userId, id));
    return "User updated successfully";
}

// Service to delete a user by ID
export const deleteUserService = async (id: number): Promise<string> => {
    await db.delete(UsersTable).where(eq(UsersTable.userId, id));
    return "User deleted successfully";
}
