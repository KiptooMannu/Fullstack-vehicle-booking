import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./register";
import bcrypt from "bcrypt";
import assert from "assert";
import { sign } from "hono/jwt";


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

// Authentication controller
// Adjust these interfaces based on your actual data structure
export interface User {
    fullName: string;
    contactPhone: string;
    address: string;
    userId: number;
    role: string;
    email: string;
}

export interface UserAuthDetails {
    password: string;
    user: User;
}

// Authentication controller
export const authenticateUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const { email, password } = user;

        // Fetch user authentication details
        const userAuthDetails = await userLoginService(email);
        if (!userAuthDetails || !userAuthDetails.password) {
            return c.json({ error: "Invalid email or password" }, 404);  // Not found
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, userAuthDetails.password);
        if (!isPasswordValid) {
            return c.json({ error: "Invalid email or password" }, 401);  // Unauthorized
        }

        // Create a payload for the JWT token
        const payload = {
            sub: userAuthDetails.user?.email,
            role: userAuthDetails.user?.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 180),  // 3 hours => SESSION EXPIRATION
        };

        const secret = process.env.JWT_SECRET as string;  // Secret key
        const token = sign(payload, secret);  // Create a JWT token

        const { fullName, contactPhone, address, userId, role } = userAuthDetails.user;
        return c.json({
            token,
            user: {
                fullName,
                contactPhone,
                address,
                userId,
                role,
            },
        }, 200);  // Return token and user details

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};