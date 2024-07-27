import { Hono } from "hono";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking } from "./bookings.controller";
import { zValidator } from "@hono/zod-validator";
import { bookingSchema } from "../validators";
import { adminOrUserRoleAuth, adminRoleAuth, userRoleAuth } from "../middlewear/bearAuth";

export const bookingsRouter = new Hono();

// GET all bookings - /api/booking
bookingsRouter.get("/bookings",adminOrUserRoleAuth ,  listBookings);

// GET a single booking by ID - /api/bookings/:id
bookingsRouter.get("/bookings/:id",adminOrUserRoleAuth , getBooking);

// POST create a new booking - /api/bookings
bookingsRouter.post("/bookings",zValidator("json", bookingSchema),adminOrUserRoleAuth ,createBooking);

// PUT update a booking by ID - /api/bookings/:id
bookingsRouter.put("/bookings/:id",adminOrUserRoleAuth , updateBooking);

// DELETE a booking by ID - /api/bookings/:id
bookingsRouter.delete("/bookings/:id",adminRoleAuth, deleteBooking);
