import { Hono } from "hono";
import { listBookings, getBooking, createBooking, updateBooking, deleteBooking } from "./bookings.controller";
import { zValidator } from "@hono/zod-validator";
import { bookingSchema } from "../validators";

export const bookingsRouter = new Hono();

// GET all bookings - /api/bookings
bookingsRouter.get("/bookings", listBookings);

// GET a single booking by ID - /api/bookings/:id
bookingsRouter.get("/bookings/:id", getBooking);

// POST create a new booking - /api/bookings
bookingsRouter.post("/bookings",zValidator("json", bookingSchema), createBooking);

// PUT update a booking by ID - /api/bookings/:id
bookingsRouter.put("/bookings/:id", updateBooking);

// DELETE a booking by ID - /api/bookings/:id
bookingsRouter.delete("/bookings/:id", deleteBooking);
