import { UsersTable, AuthenticationTable, TIUser, TIAuth } from "../drizzle/schema"; // Adjust the import paths
import db from "../drizzle/db";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Define a Zod schema for the registration data
const registrationSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  contactPhone: z.string(),
  address: z.string(),
  role: z.enum(["admin", "user"]).optional().default("user"),
  password: z.string().min(6),
});

type RegistrationData = z.infer<typeof registrationSchema>;

// Define the registration service function
export const createAuthUserService = async (data: RegistrationData): Promise<string | null> => {
  const parsedData = registrationSchema.parse(data);
  const client = await db.transaction(async (tx) => {

    const userInsertResult = await tx.insert(UsersTable).values({
      fullName: parsedData.fullName,
      email: parsedData.email,
      contactPhone: parsedData.contactPhone,
      address: parsedData.address,
      role: parsedData.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning({ userId: UsersTable.userId });

    const userId = userInsertResult[0].userId;

    await tx.insert(AuthenticationTable).values({
      userId,
      password: parsedData.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  return "User created successfully";
};


export interface User {
    fullName: string;
    contactPhone: string;
    address: string;
    userId: number;
    role: string;
    email: string;
    password: string;

}

export interface UserAuthDetails {
    password: string;
    email: string;
}



export interface Authentication {
    password: string | null;
}

export interface Booking {
    bookingId: number;
}

export interface Login {
    userId: number;
    email: string | null;
    fullName: string | null;
    role: 'admin' | 'user' | null;
    authentication: Authentication;
    bookings: Booking[];
}

export interface UserAuthDetails {
    email: string;
    password: string;
}


export const userLoginService = async (user: UserAuthDetails): Promise<Login | null> => {
    const { email, password } = user;
    const result = await db.query.UsersTable.findFirst({
        columns: {
            userId: true,
            email: true,
            fullName: true,
            role: true,
        },
        where: sql`${UsersTable.email} = ${email}`,
        with: {
            authentication: {
                columns: {
                    password: true
                }
            },
            bookings: {
                columns: {
                    bookingId: true
                },
            },
        }
    });

    // Ensure the result is either Login or null
    if (!result) {
        return null;
    }

    return {
        userId: result.userId,
        email: result.email,
        fullName: result.fullName,
        role: result.role,
        authentication: {
            password: result.authentication?.password || null,
        },
        bookings: result.bookings || [],
    };
};




