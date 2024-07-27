import { Hono } from "hono";
import { listSupportTickets, getSupportTicket, createSupportTicket, updateSupportTicket, deleteSupportTicket, getUserSupportTickets } from "./support.controller";
import { adminOrUserRoleAuth, adminRoleAuth, userRoleAuth  } from "../middlewear/bearAuth";
import { supportTicketSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const supportTicketsRouter = new Hono();

// GET all support tickets - /api/support-tickets
supportTicketsRouter.get("/support-tickets", adminOrUserRoleAuth, listSupportTickets);

// GET a single support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.get("/support-tickets/:id", adminOrUserRoleAuth, getSupportTicket);

// POST create a new support ticket - /api/support-tickets
supportTicketsRouter.post("/support-tickets", zValidator("json", supportTicketSchema), userRoleAuth, createSupportTicket);

// PUT update a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.put("/support-tickets/:id",  adminOrUserRoleAuth, updateSupportTicket);

// DELETE a support ticket by ID - /api/support-tickets/:id
supportTicketsRouter.delete("/support-tickets/:id", adminRoleAuth, deleteSupportTicket);

// GET support tickets by user ID - /api/support-tickets/user/:userId
supportTicketsRouter.get("/support-tickets/user/:userId", adminOrUserRoleAuth, getUserSupportTickets);
