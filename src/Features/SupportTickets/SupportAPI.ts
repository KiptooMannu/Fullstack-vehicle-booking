import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the interface for a support ticket
export interface TSupportTicket {
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

// Define the API slice for support tickets
export const supportTicketAPI = createApi({
  reducerPath: 'supportTicketAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-rental-backend-1.onrender.com/api' }),
  tagTypes: ['SupportTickets'],
  endpoints: (builder) => ({
    getSupportTickets: builder.query<TSupportTicket[], void>({
      query: () => 'support-tickets',
      providesTags: (result) =>
        result
          ? [...result.map(({ ticketId }) => ({ type: 'SupportTickets', ticketId } as const)), { type: 'SupportTickets', id: 'LIST' }]
          : [{ type: 'SupportTickets', id: 'LIST' }],
    }),
    getSupportTicketsByUserId: builder.query<TSupportTicket[], number>({
      query: (userId) => `support-tickets/user/${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [...result.map(({ ticketId }) => ({ type: 'SupportTickets', ticketId } as const)), { type: 'SupportTickets', userId }]
          : [{ type: 'SupportTickets', userId }],
    }),
    createSupportTicket: builder.mutation<TSupportTicket, Partial<TSupportTicket>>({
      query: (newTicket) => ({
        url: 'support-tickets',
        method: 'POST',
        body: newTicket,
      }),
      invalidatesTags: [{ type: 'SupportTickets', id: 'LIST' }],
    }),
    updateSupportTicket: builder.mutation<TSupportTicket, Partial<TSupportTicket>>({
      query: ({ ticketId, ...rest }) => ({
        url: `support-tickets/${ticketId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (result, error, { ticketId }) => [{ type: 'SupportTickets', ticketId }],
    }),
    deleteSupportTicket: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `support-tickets/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'SupportTickets', id }],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetSupportTicketsQuery,
  useGetSupportTicketsByUserIdQuery,
  useCreateSupportTicketMutation,
  useUpdateSupportTicketMutation,
  useDeleteSupportTicketMutation
} : any = supportTicketAPI;
