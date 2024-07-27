import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSPayment, PaymentsTable, BookingsTable } from "../drizzle/schema";
import { stripe } from "../drizzle/db";

// Service to fetch payments
export const paymentsService = async (limit?: number): Promise<TSPayment[] | null> => {
    if (limit) {
        return await db.query.PaymentsTable.findMany({
            limit: limit,
          with: {
            booking:{
              columns: {
                bookingId: true,
              },
              with: {
                user: true,
              }
            }
          }
        });
    }
    return await db.query.PaymentsTable.findMany({
      with: {
            booking:{
              columns: {
                bookingId: true,
              },
              with: {
                user: true,
              }
            }
          }}
    );
}

// Service to fetch a single payment by ID
export const getPaymentService = async (id: number): Promise<TSPayment | undefined> => {
    return await db.query.PaymentsTable.findFirst({
        where: eq(PaymentsTable.paymentId, id),
        with: {
            booking:{
              columns: {
                bookingId: true,
              },
              with: {
                user: {
                  columns:{
                    userId: true,
                  }
                },
              }
            }
          }
    });
}

// Service to fetch payments by booking ID
export const getPaymentsByBookingIdService = async (bookingId: number): Promise<TSPayment[] | null> => {
    return await db.query.PaymentsTable.findMany({
        where: eq(PaymentsTable.bookingId, bookingId),
        with: {
            booking:{
              columns: {
                bookingId: true,
              },
              with: {
                user: true,
              }
            }
          }
    });
}

// Service to create a new payment
// export const createPaymentService = async (payment: TIPayment): Promise<string> => {
//     await db.insert(PaymentsTable).values(payment);
//     return "Payment created successfully";
// }
interface TPaymentResponse {
  message: string;
  client_secret: string | null;
}


// export const createPaymentsService = async (paymentData: TIPayment ):Promise<TPaymentResponse | null> => {
//     if (paymentData.bookingId === undefined) {
//       throw new Error("Booking id required");
//     }
  
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Number(paymentData.amount) * 100,
//       currency: 'usd',
//       metadata: { booking_id: paymentData.bookingId.toString() }, // Ensure booking_id is a string
//     });
  
//     await db.insert(PaymentsTable).values({
//       bookingId: paymentData.bookingId,
//       paymentDate: new Date(),
//       amount: paymentData.amount,
//       paymentStatus: 'pending',
//       paymentMethod: paymentData.paymentMethod,
//       transactionId: paymentData.transactionId,


//     }).execute();
  
//     return { message: 'Payment created successfully', client_secret: paymentIntent.client_secret };
//   };



interface TIPayment {
  bookingId: number;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
}

interface TPaymentResponse {
  sessionUrl: string;
}

// export const createPaymentService = async (paymentData: any) => {
//   if (paymentData.bookingId === undefined) {
//     throw new Error("Booking id required");
//   }

//   try {
//     // Create a Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Car Booking',
//             },
//             unit_amount: Number(paymentData.amount) * 100, // Amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.FRONTEND_URL}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
//       metadata: {
//         booking_id: paymentData.bookingId.toString(),
//       },
//     });

//     // Insert payment record into the database with the status pending
//     await db.insert(PaymentsTable).values({
//       bookingId: paymentData.bookingId,
//       paymentDate: new Date(),
//       amount: paymentData.amount,
//       paymentStatus: 'pending',
//       paymentMethod: paymentData.paymentMethod,
//       transactionId: session.id, // Use the Checkout Session ID as the transaction ID
//     }).execute();

//     // Return the URL for the Stripe Checkout Session
//     return { sessionUrl: session.url as string };
//   } catch (error) {
//     console.error('Error creating payment:', error);
//     return null;
//   }
// };

export const createPaymentService = () => {
  return {
    async createCheckoutSession(bookingId: number, amount: number) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Car Booking",
              },
              unit_amount: amount * 100, // Stripe expects amount in cents
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/booking-success`,
        cancel_url: `${process.env.FRONTEND_URL}/booking-cancelled`,
        metadata: {
          bookingId: bookingId.toString(),
        },
      });

      const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100, // Convert amount to cents
      currency: 'usd',
      metadata: { booking_id: bookingId.toString() }, // Ensure booking_id is a string
    });
    // Update booking status
          await db
            .update(BookingsTable)
            .set({ bookingStatus: "confirmed" })
            .where(eq(BookingsTable.bookingId, bookingId));

    // Insert payment record into the database
    await db.insert(PaymentsTable).values({
      bookingId,
      // bookingId,
      paymentDate: new Date() as unknown as string,
      amount : amount as unknown as string,
      paymentStatus: 'confirmed',
      paymentMethod: 'credit_card',
      transactionId: paymentIntent.id, 
    }).execute();

      return session;
    },

    async handleSuccessfulPayment(sessionId: string) {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const bookingId = parseInt(session.metadata!.bookingId);

      // Handle possible null value for session.amount_total
      const amountTotal = session.amount_total;
      if (amountTotal === null) {
        throw new Error("session.amount_total is null");
      }

      // Update booking status
      await db
        .update(BookingsTable)
        .set({ bookingStatus: "confirmed" })
        .where(eq(BookingsTable.bookingId, bookingId));

      // Create payment record
      await db
        .insert(PaymentsTable)
        .values({
          bookingId,
          // bookingId, 
          amount: amountTotal as unknown as string, 
          paymentStatus: "confirmed",
          paymentMethod: session.payment_method_types[0],
          transactionId: session.payment_intent as string,
        })
        .returning();
    },
  };
};









// Service to update a payment by ID
export const updatePaymentService = async (id: number, payment: any): Promise<string> => {
    await db.update(PaymentsTable).set(payment).where(eq(PaymentsTable.paymentId, id));
    return "Payment updated successfully";
}

// Service to delete a payment by ID
export const deletePaymentService = async (id: number): Promise<string> => {
    await db.delete(PaymentsTable).where(eq(PaymentsTable.paymentId, id));
    return "Payment deleted successfully";
}
