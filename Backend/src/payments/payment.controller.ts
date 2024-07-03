import { Context } from "hono";
import { paymentsService, getPaymentService, createPaymentService, updatePaymentService, deletePaymentService } from "./payment.services";

export const listPayments = async (c: Context) => {
    try {
        // Limit the number of payments to be returned
        const limit = Number(c.req.query('limit'));

        const data = await paymentsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Payments not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await getPaymentService(id);
    if (payment == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(payment, 200);
}

export const createPayment = async (c: Context) => {
    try {
        const payment = await c.req.json();
        const createdPayment = await createPaymentService(payment);

        if (!createdPayment) {
            return c.text("Payment not created", 404);
        }

        return c.json(createdPayment, 201); // Return the created payment object

    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await c.req.json();
    try {
        // Search for the payment
        const searchedPayment = await getPaymentService(id);
        if (searchedPayment == undefined) return c.text("Payment not found", 404);

        // Update the payment data
        const res = await updatePaymentService(id, payment);

        // Return a success message
        if (!res) return c.text("Payment not updated", 404);

        return c.json({ msg: "Payment updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deletePayment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        // Search for the payment
        const payment = await getPaymentService(id);
        if (payment == undefined) return c.text("Payment not found", 404);

        // Delete the payment
        const res = await deletePaymentService(id);
        if (!res) return c.text("Payment not deleted", 404);

        return c.json({ msg: "Payment deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
