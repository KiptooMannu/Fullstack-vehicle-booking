import { pgTable, serial, text, varchar, integer, timestamp, pgEnum, decimal, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Define enum
export const userRoleEnum = pgEnum("role", ["admin", "user"]);

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
    vehicleSpecId: integer("vehicle_spec_id").notNull().references(() => VehicleSpecificationsTable.vehicleId),
    vehicleId: serial("vehicle_id").primaryKey(),
    rentalRate: decimal("rental_rate"),
    availability: boolean("availability"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Location and Branches Table
export const LocationTable = pgTable("locations", {
    locationId: serial("location_id").primaryKey(),
    name: varchar("name", { length: 100 }),
    address: varchar("address", { length: 100 }),
    contactPhone: varchar("contact_phone", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings Table
export const BookingsTable = pgTable("bookings", {
    bookingId: serial("booking_id").primaryKey(),
    use: integer("user_id").notNull().references(() => UsersTable.userId),
    vehicleId: integer("vehicle_id").notNull().references(() => VehiclesTable.vehicleId),
    locationId: integer("location_id").notNull().references(() => LocationTable.locationId),
    bookingDate: timestamp("booking_date"),
    returnDate: timestamp("return_date"),
    totalAmount: decimal("total_amount"),
    bookingStatus: varchar("booking_status").default("Pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments Table
export const PaymentsTable = pgTable("payments", {
    paymentId: serial("payment_id").primaryKey(),
    bookingId: integer("booking_id").notNull().references(() => BookingsTable.bookingId),
    amount: decimal("amount"),
    paymentStatus: varchar("payment_status").default("Pending"),
    paymentDate: timestamp("payment_date"),
    paymentMethod: varchar("payment_method", { length: 100 }),
    transactionId: varchar("transaction_id", { length: 100 }),
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

// Define relationships

// Users Relations
export const usersRelations = relations(UsersTable, ({ one, many }) => ({
    bookings: many(BookingsTable),
    payments: many(PaymentsTable),
    supportTickets: many(SupportTicketsTable),
    authentication: one(AuthenticationTable, {
        fields: [UsersTable.userId],
        references: [AuthenticationTable.userId]
    }),
}));

// Vehicle Specifications Relations
export const vehicleSpecificationsRelations = relations(VehicleSpecificationsTable, ({ many }) => ({
    vehicles: many(VehiclesTable),
}));

// Vehicles Relations
export const vehiclesRelations = relations(VehiclesTable, ({ one, many }) => ({
    specifications: one(VehicleSpecificationsTable, {
        fields: [VehiclesTable.vehicleSpecId],
        references: [VehicleSpecificationsTable.vehicleId]
    }),
    bookings: many(BookingsTable),
    fleetManagement: many(FleetManagementTable)
}));

// Bookings Relations
export const bookingsRelations = relations(BookingsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [BookingsTable.use],
        references: [UsersTable.userId]
    }),
    vehicle: one(VehiclesTable, {
        fields: [BookingsTable.vehicleId],
        references: [VehiclesTable.vehicleId]
    }),
    location: one(LocationTable, {
        fields: [BookingsTable.locationId],
        references: [LocationTable.locationId]
    }),
    payments: one(PaymentsTable, {
        fields: [BookingsTable.bookingId],
        references: [PaymentsTable.bookingId]
    }),
}));

// Payments Relations
export const paymentsRelations = relations(PaymentsTable, ({ one }) => ({
    booking: one(BookingsTable, {
        fields: [PaymentsTable.bookingId],
        references: [BookingsTable.bookingId]
    }),
}));

// Support Tickets Relations
export const supportTicketsRelations = relations(SupportTicketsTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [SupportTicketsTable.userId],
        references: [UsersTable.userId]
    }),
}));

// Fleet Management Relations
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

export type TILocation = typeof LocationTable.$inferInsert;
export type TSLocation = typeof LocationTable.$inferSelect;

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
