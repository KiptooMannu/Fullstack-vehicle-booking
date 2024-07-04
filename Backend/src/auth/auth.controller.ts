import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.services";
import bycrpt from "bcrypt";
import assert from "assert";
import { sign } from "hono/jwt";


assert(process.env.JWT_SECRET, "JWT_SECRET is not set in the .env file");

export const registerUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const pass = user.password;
        const hashedPassword = await bycrpt.hash(pass, 10);
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

export const loginUser = async (c: Context) => {
    try {
        const { email, password } = await c.req.json();  // Extract email and password from request body
        const userExist = await userLoginService({ email, password });  // Authenticate user

        if (!userExist) {
            return c.json({ error: "User not found" }, 404);  // User not found
        }

        // Check password using bcrypt
        const passwordMatch = await bycrpt.compare(password, userExist.authentication.password as string);

        if (!passwordMatch) {
            return c.json({ error: "Invalid credentials" }, 401);  // Invalid credentials
        }

        // Create JWT payload
        const payload = {
            sub: userExist.email,  // Assuming 'email' is a suitable unique identifier for JWT sub claim
            role: userExist.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 1800)  // 3 hours (SESSION EXPIRATION)
        };

        const secret = process.env.JWT_SECRET as string;  // Secret key for JWT signing
        const token = await sign(payload, secret);  // Create JWT token

        // Prepare response JSON
        const responseData = {
            token,
            user: {
                role: userExist.role,
                fullName: userExist.fullName,
                email: userExist.email
                // Add other necessary fields from userExist
            }
        };

        return c.json(responseData, 200);  // Return token and user details
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);  // Handle and return any caught errors
    }
};
