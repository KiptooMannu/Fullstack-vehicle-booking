import { UsersTable, AuthenticationTable, TIUser, TIAuth } from "../drizzle/schema"; // Adjust the import paths
import db from "../drizzle/db";
import { z } from "zod";

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
