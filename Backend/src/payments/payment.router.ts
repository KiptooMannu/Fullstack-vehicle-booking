import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { paymentSchema } from "../validators"; // Assuming you have a paymentSchema defined for validation
import { listPayments, getPayment, createPayment, updatePayment, deletePayment } from "./payment.controller";
import { adminOrUserRoleAuth, adminRoleAuth, userRoleAuth } from "../middlewear/bearAuth";

export const paymentRouter = new Hono();

// GET all payments - /api/payments
paymentRouter.get("/payments",adminOrUserRoleAuth , listPayments);

// GET a single payment by ID - /api/payments/:id
paymentRouter.get("/payments/:id",adminOrUserRoleAuth,getPayment);

// POST create a new payment - /api/payments
// paymentRouter.post("/payments",zValidator("json", paymentSchema),userRoleAuth , createPayment);

// PUT update a payment by ID - /api/payments/:id
paymentRouter.put("/payments/:id",adminOrUserRoleAuth, updatePayment);

// DELETE a payment by ID - /api/payments/:id
paymentRouter.delete("/payments/:id",adminRoleAuth , deletePayment);


paymentRouter.post(
  "/create-checkout-session",
  createPayment.createCheckoutSession
);
paymentRouter.post("/webhook", createPayment.handleWebhook);
paymentRouter.get(
  "/test-checkout-session",
  createPayment.testCreateCheckoutSession
);
