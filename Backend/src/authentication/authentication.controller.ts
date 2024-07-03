import { Context } from "hono";
import { getAuthServiceByUserId, createAuthService, updateAuthService, deleteAuthService } from "./authentication.services";

export const getAuth = async (c: Context) => {
    const userId = parseInt(c.req.param("user_id"));
    if (isNaN(userId)) return c.text("Invalid User ID", 400);

    const auth = await getAuthServiceByUserId(userId);
    if (auth == undefined) {
        return c.text("Authentication entry not found", 404);
    }
    return c.json(auth, 200);
}

export const createAuth = async (c: Context) => {
    try {
        const auth = await c.req.json();
        const createdAuth = await createAuthService(auth);

        if (!createdAuth) {
            return c.text("Authentication entry not created", 404);
        }

        return c.json({ msg: "Authentication entry created successfully" }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateAuth = async (c: Context) => {
    const userId = parseInt(c.req.param("user_id"));
    if (isNaN(userId)) return c.text("Invalid User ID", 400);

    const auth = await c.req.json();
    try {
        // Search for the auth entry
        const searchedAuth = await getAuthServiceByUserId(userId);
        if (searchedAuth == undefined) return c.text("Authentication entry not found", 404);

        // Update the auth data
        const res = await updateAuthService(userId, auth);

        // Return a success message
        if (!res) return c.text("Authentication entry not updated", 404);

        return c.json({ msg: "Authentication entry updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteAuth = async (c: Context) => {
    const userId = Number(c.req.param("user_id"));
    if (isNaN(userId)) return c.text("Invalid User ID", 400);

    try {
        // Search for the auth entry
        const auth = await getAuthServiceByUserId(userId);
        if (auth == undefined) return c.text("Authentication entry not found", 404);

        // Delete the auth entry
        const res = await deleteAuthService(userId);
        if (!res) return c.text("Authentication entry not deleted", 404);

        return c.json({ msg: "Authentication entry deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
