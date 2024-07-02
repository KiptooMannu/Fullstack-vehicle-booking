import { pgTable, serial, text, varchar, integer, timestamp, pgEnum, decimal, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define enums
export const userRoleEnum = pgEnum("role", ["admin", "user"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "canceled"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "confirmed", "canceled"]);

// Users Table
export const UsersTable = pgTable("users", {
    userId: serial("user_id").primaryKey(),
    fullName: text("full_name"),
    email: varchar("email", { length: 100 }).unique(),
    contactPhone: varchar("contact_phone", { length: 100 }),
    address: varchar("address", { length: 100 }),
    role: userRoleEnum("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Authentication Table
export const AuthenticationTable = pgTable("authentication", {
    authId: serial("auth_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UsersTable.userId),
    password: varchar("password", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Customer Support Tickets Table
export const SupportTicketsTable = pgTable("support_tickets", {
    ticketId: serial("ticket_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UsersTable.userId),
    subject: varchar("subject", { length: 100 }),
    description: text("description"),
    status: varchar("status"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships for Users
export const usersRelations = relations(UsersTable, ({ one, many }) => ({
    bookings: many(BookingsTable),
    payments: many(PaymentsTable),
    supportTickets: many(SupportTicketsTable),
    authentication: one(AuthenticationTable, {
        fields: [UsersTable.userId],
        references: [AuthenticationTable.userId]
    }),
}));

// Vehicle Specifications Table
export const VehicleSpecificationsTable = pgTable("vehicle_specifications", {
    vehicleId: serial("vehicle_id").primaryKey(),
    manufacturer: varchar("manufacturer", { length: 100 }),
    model: varchar("model", { length: 100 }),
    year: integer("year"),
    fuelType: varchar("fuel_type", { length: 100 }),
    engineCapacity: varchar("engine_capacity", { length: 100 }),
    transmission: varchar("transmission", { length: 100 }),
    seatingCapacity: integer("seating_capacity"),
    color: varchar("color", { length: 100 }),
    features: text("features"),
});

// Vehicles Table
export const VehiclesTable = pgTable("vehicles", {
    vehicleId: serial("vehicle_id").primaryKey(),
    vehicleSpecId: integer("vehicle_spec_id").notNull().references(() => VehicleSpecificationsTable.vehicleId).unique(),
    rentalRate: decimal("rental_rate"),
    availability: boolean("availability"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Fleet Management Table
export const FleetManagementTable = pgTable("fleet_management", {
    fleetId: serial("fleet_id").primaryKey(),
    vehicleId: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicleId),
    acquisitionDate: timestamp("acquisition_date"),
    depreciationRate: decimal("depreciation_rate"),
    currentValue: decimal("current_value"),
    maintenanceCost: decimal("maintenance_cost"),
    status: varchar("status"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships for Vehicle Specifications
export const vehicleSpecificationsRelations = relations(VehicleSpecificationsTable, ({ many }) => ({
    vehicles: many(VehiclesTable),
}));

// Define relationships for Vehicles
export const vehiclesRelations = relations(VehiclesTable, ({ one, many }) => ({
    specifications: one(VehicleSpecificationsTable, {
        fields: [VehiclesTable.vehicleSpecId],
        references: [VehicleSpecificationsTable.vehicleId]
    }),
    bookings: many(BookingsTable),
    fleetManagement: many(FleetManagementTable)
}));

// Branches Table
export const BranchesTable = pgTable("branches", {
    branchId: serial("branch_id").primaryKey(),
    name: varchar("name", { length: 100 }),
    address: varchar("address", { length: 100 }),
    contactPhone: varchar("contact_phone", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings Table
export const BookingsTable = pgTable("bookings", {
    bookingId: serial("booking_id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UsersTable.userId),
    vehicleId: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicleId),
    branchId: integer("branch_id").notNull().references(() => BranchesTable.branchId),
    bookingDate: timestamp("booking_date"),
    returnDate: timestamp("return_date"),
    totalAmount: decimal("total_amount"),
    bookingStatus: bookingStatusEnum("booking_status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments Table
export const PaymentsTable = pgTable("payments", {
    paymentId: serial("payment_id").primaryKey(),
    bookingId: integer("booking_id").notNull().references(() => BookingsTable.bookingId),
    amount: decimal("amount"),
    paymentStatus: paymentStatusEnum("payment_status").default("pending"),
    paymentDate: timestamp("payment_date"),
    paymentMethod: varchar("payment_method", { length: 100 }),
    transactionId: varchar("transaction_id", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Define relationships for Bookings
export const bookingsRelations = relations(BookingsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [BookingsTable.userId],
        references: [UsersTable.userId]
    }),
    vehicle: one(VehiclesTable, {
        fields: [BookingsTable.vehicleId],
        references: [VehiclesTable.vehicleId]
    }),
    branch: one(BranchesTable, {
        fields: [BookingsTable.branchId],
        references: [BranchesTable.branchId]
    }),
    payments: one(PaymentsTable, {
        fields: [BookingsTable.bookingId],
        references: [PaymentsTable.bookingId]
    }),
}));

// Define relationships for Payments
export const paymentsRelations = relations(PaymentsTable, ({ one }) => ({
    booking: one(BookingsTable, {
        fields: [PaymentsTable.bookingId],
        references: [BookingsTable.bookingId]
    }),
}));

// Define relationships for Support Tickets
export const supportTicketsRelations = relations(SupportTicketsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [SupportTicketsTable.userId],
        references: [UsersTable.userId]
    }),
}));

// Define relationships for Fleet Management
export const fleetManagementRelations = relations(FleetManagementTable, ({ one }) => ({
    vehicle: one(VehiclesTable, {
        fields: [FleetManagementTable.vehicleId],
        references: [VehiclesTable.vehicleId]
    }),
}));

// Types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

export type TIVehicleSpec = typeof VehicleSpecificationsTable.$inferInsert;
export type TSVehicleSpec = typeof VehicleSpecificationsTable.$inferSelect;

export type TIVehicle = typeof VehiclesTable.$inferInsert;
export type TSVehicle = typeof VehiclesTable.$inferSelect;

export type TIBranch = typeof BranchesTable.$inferInsert;
export type TSBranch = typeof BranchesTable.$inferSelect;

export type TIBooking = typeof BookingsTable.$inferInsert;
export type TSBooking = typeof BookingsTable.$inferSelect;

export type TIPayment = typeof PaymentsTable.$inferInsert;
export type TSPayment = typeof PaymentsTable.$inferSelect;

export type TIAuth = typeof AuthenticationTable.$inferInsert;
export type TSAuth = typeof AuthenticationTable.$inferSelect;

export type TISupportTicket = typeof SupportTicketsTable.$inferInsert;
export type TSSupportTicket = typeof SupportTicketsTable.$inferSelect;

export type TIFleetManagement = typeof FleetManagementTable.$inferInsert;
export type TSFleetManagement = typeof FleetManagementTable.$inferSelect;
