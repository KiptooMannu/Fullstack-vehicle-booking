import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TISupportTicket, TSSupportTicket, SupportTicketsTable } from "../drizzle/schema";

// Service to fetch support tickets
export const supportTicketsService = async (limit?: number): Promise<TSSupportTicket[] | null> => {
    if (limit) {
        return await db.query.SupportTicketsTable.findMany({
            limit: limit
        });
    }
    return await db.query.SupportTicketsTable.findMany();
}

// Service to fetch a single support ticket by ID
export const getSupportTicketService = async (id: number): Promise<TSSupportTicket | undefined> => {
    return await db.query.SupportTicketsTable.findFirst({
        where: eq(SupportTicketsTable.ticketId, id)
    });
}

// Service to create a new support ticket
export const createSupportTicketService = async (ticket: TISupportTicket) => {
    await db.insert(SupportTicketsTable).values(ticket);
    return "Support ticket created successfully";
}

// Service to update a support ticket by ID
export const updateSupportTicketService = async (id: number, ticket: Partial<TISupportTicket>) => {
    await db.update(SupportTicketsTable).set(ticket).where(eq(SupportTicketsTable.ticketId, id));
    return "Support ticket updated successfully";
}

// Service to delete a support ticket by ID
export const deleteSupportTicketService = async (id: number) => {
    await db.delete(SupportTicketsTable).where(eq(SupportTicketsTable.ticketId, id));
    return "Support ticket deleted successfully";
}
