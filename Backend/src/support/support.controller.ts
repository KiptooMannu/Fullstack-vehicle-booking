import { Context } from "hono";
import { supportTicketsService, getSupportTicketService, createSupportTicketService, updateSupportTicketService, deleteSupportTicketService } from "./support.services";

export const listSupportTickets = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await supportTicketsService(limit);

        if (data == null || data.length == 0) {
            return c.text("Support tickets not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const ticket = await getSupportTicketService(id);
    if (ticket == undefined) {
        return c.text("Support ticket not found", 404);
    }
    return c.json(ticket, 200);
}

export const createSupportTicket = async (c: Context) => {
    try {
        const ticket = await c.req.json();
        const createdTicket = await createSupportTicketService(ticket);

        if (!createdTicket) {
            return c.text("Support ticket not created", 404);
        }
        return c.json(createdTicket, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const updateSupportTicket = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const ticket = await c.req.json();
    try {
        const searchedTicket = await getSupportTicketService(id);
        if (searchedTicket == undefined) return c.text("Support ticket not found", 404);

        const res = await updateSupportTicketService(id, ticket);
        if (!res) return c.text("Support ticket not updated", 404);

        return c.json({ msg: "Support ticket updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteSupportTicket = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const ticket = await getSupportTicketService(id);
        if (ticket == undefined) return c.text("Support ticket not found", 404);

        const res = await deleteSupportTicketService(id);
        if (!res) return c.text("Support ticket not deleted", 404);

        return c.json({ msg: "Support ticket deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
