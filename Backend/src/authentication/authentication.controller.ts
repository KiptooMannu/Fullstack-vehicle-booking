import { Context } from "hono";
import { authService, getAuthService, createAuthService, updateAuthService, deleteAuthService } from "./authentication.services";

export const listAuth = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await authService(limit);

        if (data == null || data.length == 0) {
            return c.text("Authentication entries not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getAuth = async (c: Context) => {
    const userId = parseInt(c.req.param("userId"));
    if (isNaN(userId)) return c.text("Invalid user ID", 400);

    const auth = await getAuthService(userId);
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
        return c.json(createdAuth, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const updateAuth = async (c: Context) => {
    const userId = parseInt(c.req.param("userId"));
    if (isNaN(userId)) return c.text("Invalid user ID", 400);

    const auth = await c.req.json();
    try {
        const searchedAuth = await getAuthService(userId);
        if (searchedAuth == undefined) return c.text("Authentication entry not found", 404);

        const res = await updateAuthService(userId, auth);
        if (!res) return c.text("Authentication entry not updated", 404);

        return c.json({ msg: "Authentication entry updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteAuth = async (c: Context) => {
    const userId = Number(c.req.param("userId"));
    if (isNaN(userId)) return c.text("Invalid user ID", 400);

    try {
        const auth = await getAuthService(userId);
        if (auth == undefined) return c.text("Authentication entry not found", 404);

        const res = await deleteAuthService(userId);
        if (!res) return c.text("Authentication entry not deleted", 404);

        return c.json({ msg: "Authentication entry deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
