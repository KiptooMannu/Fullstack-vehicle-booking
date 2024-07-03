import { Hono } from "hono";
import { listSupportTickets, getSupportTicket, createSupportTicket, updateSupportTicket, deleteSupportTicket } from "./support.controller";

export const supportTicketsRouter = new Hono();

// GET all support tickets - /api/support-tickets
supportTicketsRouter.get("/support-tickets", listSupportTickets);

// GET a single support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.get("/support-tickets/:id", getSupportTicket);

// POST create a new support ticket - /api/support-tickets
supportTicketsRouter.post("/support-tickets", createSupportTicket);

// PUT update a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.put("/support-tickets/:id", updateSupportTicket);

// DELETE a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.delete("/support-tickets/:id", deleteSupportTicket);
