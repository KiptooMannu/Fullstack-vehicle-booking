import { z } from "zod";

// Enum schemas
const userRoleEnum = z.enum(["admin", "user"]);
const bookingStatusEnum = z.enum(["pending", "confirmed", "canceled"]);
const paymentStatusEnum = z.enum(["pending", "confirmed", "canceled"]);

// Users Table Schema
export const userSchema = z.object({
    userId: z.number().optional(),
    fullName: z.string().max(255),
    email: z.string().email().max(100),
    contactPhone: z.string().max(100),
    address: z.string().max(100),
    role: userRoleEnum.default("user"),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Authentication Table Schema
export const authenticationSchema = z.object({
    authId: z.number().optional(),
    userId: z.number(),
    password: z.string().max(100),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Customer Support Tickets Table Schema
export const supportTicketSchema = z.object({
    ticketId: z.number().optional(),
    userId: z.number(),
    subject: z.string().max(100),
    description: z.string(),
    status: z.string(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Vehicle Specifications Table Schema
export const vehicleSpecificationsSchema = z.object({
    vehicleId: z.number().optional(),
    manufacturer: z.string().max(100),
    model: z.string().max(100),
    year: z.number().nullable(),
    fuelType: z.string().max(100),
    engineCapacity: z.string().max(100),
    transmission: z.string().max(100),
    seatingCapacity: z.number(),
    color: z.string().max(100),
    features: z.string(),
});

// Vehicles Table Schema
export const vehicleSchema = z.object({
    vehicleId: z.number().optional(),
    vehicleSpecId: z.number(),
    rentalRate: z.number(),
    availability: z.boolean(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Fleet Management Table Schema
export const fleetManagementSchema = z.object({
    fleetId: z.number().optional(),
    vehicleId: z.number(),
    acquisitionDate: z.string().datetime(),
    depreciationRate: z.number(),
    currentValue: z.number(),
    maintenanceCost: z.number(),
    status: z.string(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Branches Table Schema
export const branchSchema = z.object({
    branchId: z.number().optional(),
    name: z.string().max(100),
    address: z.string().max(100),
    contactPhone: z.string().max(100),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// // Bookings Table Schema
// export const bookingSchema = z.object({
//     bookingId: z.number().optional(),
//     userId: z.number(),
//     vehicleId: z.number(),
//     branchId: z.number(),
//     bookingDate: z.string().datetime(),
//     returnDate: z.string().datetime(),
//     totalAmount: z.number(),
//     bookingStatus: bookingStatusEnum.default("pending"),
//     createdAt: z.string().datetime().optional(),
//     updatedAt: z.string().datetime().optional(),
// });

// / Assuming bookingStatusEnum is defined correctly as a Zod enum
// const bookingStatusEnum = z.enum(["pending", "confirmed", "canceled"]);

// Define schema
export const bookingSchema = z.object({
    bookingId: z.number().optional(),
    userId: z.number(),
    vehicleId: z.number(),
    branchId: z.number(),
    bookingDate: z.string().transform((val) => new Date(val)), // Convert string to Date
    returnDate: z.string().transform((val) => new Date(val)), // Convert string to Date
    totalAmount: z.number(),
    bookingStatus: bookingStatusEnum.default("pending"),
    createdAt: z.string().transform((val) => (val ? new Date(val) : undefined)).optional(), // Optional Date field
    updatedAt: z.string().transform((val) => (val ? new Date(val) : undefined)).optional(), // Optional Date field
});

// Payments Table Schema
export const paymentSchema = z.object({
    paymentId: z.number().optional(),
    bookingId: z.number(),
    amount: z.number(),
    paymentStatus: paymentStatusEnum.default("pending"),
    paymentDate: z.string().datetime(),
    paymentMethod: z.string().max(100),
    transactionId: z.string().max(100),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
});

// Login schema
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});