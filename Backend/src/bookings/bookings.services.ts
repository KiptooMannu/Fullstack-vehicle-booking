import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIBooking, TSBooking, BookingsTable } from "../drizzle/schema";

// Service to fetch bookings
export const bookingsService = async (limit?: number): Promise<TSBooking[] | null> => {
    if (limit) {
        return await db.query.BookingsTable.findMany({
            limit: limit
        });
    }
    return await db.query.BookingsTable.findMany();
}

// Service to fetch a single booking by ID
export const getBookingService = async (id: number): Promise<TSBooking | undefined> => {
    return await db.query.BookingsTable.findFirst({
        where: eq(BookingsTable.bookingId, id)
    });
}

// Service to create a new booking
export const createBookingService = async (booking: TIBooking) => {
    await db.insert(BookingsTable).values(booking);
    return "Booking created successfully";
}

// Service to update a booking by ID
export const updateBookingService = async (id: number, booking: Partial<TIBooking>) => {
    await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingId, id));
    return "Booking updated successfully";
}

// Service to delete a booking by ID
export const deleteBookingService = async (id: number) => {
    await db.delete(BookingsTable).where(eq(BookingsTable.bookingId, id));
    return "Booking deleted successfully";
}
