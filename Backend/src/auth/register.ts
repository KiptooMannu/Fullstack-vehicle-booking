import { UsersTable, AuthenticationTable, TIUser, TIAuth } from "../drizzle/schema"; // Adjust the import paths
import db from "../drizzle/db";
import { z } from "zod";
import { sql } from "drizzle-orm";

// Define a Zod schema for the registration data
const registrationSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email(),
  contactPhone: z.string().nonempty(),
  address: z.string().nonempty(),
  role: z.enum(["admin", "user"]).optional().default("user"),
  password: z.string().min(6),
});

type RegistrationData = z.infer<typeof registrationSchema>;

// Define the registration service function
export const createAuthUserService = async (data: RegistrationData): Promise<string | null> => {
  // Validate the input data
  const parsedData = registrationSchema.parse(data);

  // Start a transaction
  const client = await db.transaction(async (tx) => {
    // Insert data into the UsersTable
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

    // Insert data into the AuthenticationTable
    await tx.insert(AuthenticationTable).values({
      userId,
      password: parsedData.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  return "User created successfully";
};




// export const userLoginService = async (email: string, password: string) => {
//     // Find the user and their authentication details by email
//     const authOnUser = await db.query.AuthenticationTable.findFirst({
//         columns: {
//             password: true,
//         },
//         where: sql`${UsersTable.email} = ${email}`,
//         with: {
//             user: {
//                 columns: {
//                     fullName: true,
//                     contactPhone: true,
//                     address: true,
//                     userId: true,
//                     role: true,
//                 },
//             },
//         },
//     });
//   }
// Adjust these interfaces based on your actual data structure
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
    user: User;
}



export const userLoginService = async (email: string): Promise<UserAuthDetails | null> => {
    // Find the user and their authentication details by email
    const authOnUser = await db.query.AuthenticationTable.findFirst({
        columns: {
            password: true,
        },
        where: sql`${UsersTable.email} = ${email}`,
        with: {
            user: {
                columns: {
                    userId: true,
                    fullName: true,
                    contactPhone: true,
                    address: true,
                    role: true,
                    email: true,
                },
            },
        },
    });

    if (!authOnUser || !authOnUser.password) {
        return null;  // If no user or password is found, return null
    }

    // Ensure the returned object is of type UserAuthDetails
    const userAuthDetails: UserAuthDetails = {
        password: authOnUser.password,  // Ensure this is never null
        user: authOnUser.user,
    };

    return userAuthDetails;
};
