import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export const stripeAPI = createApi({
  reducerPath: 'stripeAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://car-rental-backend-1.onrender.com/api/',
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, { bookingId: number; amount: number }>({
      query: ({ bookingId, amount }) => ({
        url: 'create-checkout-session',
        method: 'POST',
        body: {
          bookingId,
          amount,
          success_url: 'http://localhost:8000/payment-success',
          cancel_url: 'http://localhost:8000/payment-cancel'
        },
      }),
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation
} = stripeAPI;
