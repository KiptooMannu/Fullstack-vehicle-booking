import { Context } from "hono";
import { paymentsService, getPaymentService, updatePaymentService, deletePaymentService, createPaymentService } from "./payment.services";
import { stripe } from "../drizzle/db";

// List payments with a limit
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

// Get a specific payment by ID
export const getPayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const payment = await getPaymentService(id);
    if (payment == undefined) {
        return c.text("Payment not found", 404);
    }
    return c.json(payment, 200);
}




const paymentService = createPaymentService();

export const createPayment = {
  async createCheckoutSession(c: Context) {
    try {
      const { bookingId, amount } = await c.req.json();
      console.log(
        `Check if id and amount is being received: ${bookingId}, amount: ${amount}`
      );

      const session = await paymentService.createCheckoutSession(
        bookingId,
        amount
      );

      return c.json({ sessionId: session.id , checkoutUrl: session.url});
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return c.json(
        { success: false, error: "Failed to create checkout session" },
        500
      );
    }
  },
  //testing of checkout session

  async testCreateCheckoutSession(c: Context) {
    try {
      // For testing, we'll use hardcoded values
      const bookingId = 110;
      const amount = 10000; // $100
      console.log(
        `Testing checkout session inpts for bookingId: ${bookingId}, amount: ${amount}`
      );

      const session = await paymentService.createCheckoutSession(
        bookingId,
        amount
      );
      ///trying to update data on mytables once successful
      await paymentService.handleSuccessfulPayment(session.id);

      return c.json({
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url,
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return c.json(
        { success: false, error: "Failed to create checkout session" },
        500
      );
    }
  },

  ///end of test

  async handleWebhook(c: Context) {
    const sig = c.req.header("stripe-signature");
    const rawBody = await c.req.raw.text();

    try {
      const event = stripe.webhooks.constructEvent(
        rawBody,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        await paymentService.handleSuccessfulPayment(session.id);
      }

      return c.json({ received: true });
    } catch (err) {
      console.error(err);
      return c.json({ error: "Webhook error" }, 400);
    }
  },
};





// Update a specific payment by ID
export const updatePayment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const paymentData = await c.req.json();
    try {
        // Search for the payment
        const searchedPayment = await getPaymentService(id);
        if (searchedPayment == undefined) return c.text("Payment not found", 404);

        // Update the payment data
        const res = await updatePaymentService(id, paymentData);

        // Return a success message
        if (!res) return c.text("Payment not updated", 404);

        return c.json({ msg: "Payment updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Delete a specific payment by ID
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
