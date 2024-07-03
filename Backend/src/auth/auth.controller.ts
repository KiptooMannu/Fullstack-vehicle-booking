import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService } from "./register";
import bcrypt from "bcrypt";
import assert from "assert";

assert(process.env.JWT_SECRET, "JWT_SECRET is not set in the .env file");

export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bcrypt.hash(pass, 10);
        user.password = hashedPassword;
        const createdUser = await createAuthUserService(user);
        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
