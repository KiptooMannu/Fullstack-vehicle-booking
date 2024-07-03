import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { paymentSchema } from "../validators"; // Assuming you have a paymentSchema defined for validation
import { listPayments, getPayment, createPayment, updatePayment, deletePayment } from "./payment.controller";

export const paymentRouter = new Hono();

// GET all payments - /api/payments
paymentRouter.get("/payments", listPayments);

// GET a single payment by ID - /api/payments/:id
paymentRouter.get("/payments/:id", getPayment);

// POST create a new payment - /api/payments
paymentRouter.post("/payments", createPayment);

// PUT update a payment by ID - /api/payments/:id
paymentRouter.put("/payments/:id", updatePayment);

// DELETE a payment by ID - /api/payments/:id
paymentRouter.delete("/payments/:id", deletePayment);
