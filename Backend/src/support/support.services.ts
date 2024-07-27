import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TISupportTicket, TSSupportTicket, SupportTicketsTable } from "../drizzle/schema";

// Existing services
export const supportTicketsService = async (limit?: number): Promise<TSSupportTicket[] | null> => {
    if (limit) {
        return await db.query.SupportTicketsTable.findMany({
            limit: limit,
            with: {
                user: {
                    columns: {
                        email: true,
                        fullName: true,
                    }
                }
            }
        });
    }
    return await db.query.SupportTicketsTable.findMany();
}

export const getSupportTicketService = async (id: number): Promise<TSSupportTicket | undefined> => {
    return await db.query.SupportTicketsTable.findFirst({
        where: eq(SupportTicketsTable.ticketId, id),
        with: {
            user: {
                columns:{
                    email: true,
                    fullName: true
                }
            }
        }
    });
}

export const createSupportTicketService = async (ticket: TISupportTicket): Promise<string> => {
    await db.insert(SupportTicketsTable).values(ticket);
    return "Support ticket created successfully";
}

export const updateSupportTicketService = async (id: number, ticket: Partial<TISupportTicket>): Promise<string> => {
    await db.update(SupportTicketsTable).set(ticket).where(eq(SupportTicketsTable.ticketId, id));
    return "Support ticket updated successfully";
}

export const deleteSupportTicketService = async (id: number): Promise<string> => {
    await db.delete(SupportTicketsTable).where(eq(SupportTicketsTable.ticketId, id));
    return "Support ticket deleted successfully";
}

// New service to fetch support tickets by user ID
export const getUserSupportTicketsService = async (userId: number): Promise<TSSupportTicket[] | null> => {
    return await db.query.SupportTicketsTable.findMany({
        where: eq(SupportTicketsTable.userId, userId),
        with: {
            user: {
                columns: {
                    email: true,
                    fullName: true,
                }
            }
        }
    });
}
