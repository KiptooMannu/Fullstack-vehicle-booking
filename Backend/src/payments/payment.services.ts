import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIPayment, TSPayment, PaymentsTable } from "../drizzle/schema";

// Service to fetch payments
export const paymentsService = async (limit?: number): Promise<TSPayment[] | null> => {
    if (limit) {
        return await db.query.PaymentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.PaymentsTable.findMany();
}

// Service to fetch a single payment by ID
export const getPaymentService = async (id: number): Promise<TSPayment | undefined> => {
    return await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.paymentId, id)
    });
}

// Service to create a new payment
export const createPaymentService = async (payment: TIPayment) => {
    await db.insert(PaymentsTable).values(payment);
    return "Payment created successfully";
}

// Service to update a payment by ID
export const updatePaymentService = async (id: number, payment: TIPayment) => {
    await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.paymentId, id));
    return "Payment updated successfully";
}

// Service to delete a payment by ID
export const deletePaymentService = async (id: number) => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, id));
    return "Payment deleted successfully";
}
