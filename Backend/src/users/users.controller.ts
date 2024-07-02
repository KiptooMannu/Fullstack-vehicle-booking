import { Context } from "hono";
import {
    usersService,
    getUserService,
    createUserService,
    updateUserService,
    deleteUserService,
} from "./users.services";

export const listUsers = async (c: Context) => {
    try {
        // Limit the number of users to be returned
        const limit = Number(c.req.query('limit'));

        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("Users not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
}

export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await createUserService(user);

        if (!createdUser) {
            return c.text("User not created", 404);
        }

        return c.json(createdUser, 201); // Return the created user object

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // Search for the user
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);

        // Update the user data
        const res = await updateUserService(id, user);

        // Return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: "User updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // Search for the user
        const user = await getUserService(id);
        if (user == undefined) return c.text("User not found", 404);

        // Delete the user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: "User deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
