import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TBooking {
  bookingId: number;
  userId: number;
  vehicleId: number;
  branchId: number;
  bookingDate: Date;
  returnDate: Date;
  totalAmount: string;
  bookingStatus: string;
  createdAt: Date;
  updatedAt: Date;
  branch: {
    name: string;
  };
  vehicle: {
    rentalRate: number;
    specifications: {
      model: string;
    };
  };
}

// Define the API slice
export const bookingAPI = createApi({
  reducerPath: 'bookingAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://car-rental-backend-1.onrender.com/api' }),
  tagTypes: ['Bookings'],
  endpoints: (builder) => ({
    getBookings: builder.query<TBooking[], void>({
      query: () => 'bookings',
      providesTags: (result) =>
        result ? [...result.map(({ bookingId }) => ({ type: 'Bookings', bookingId } as const)), { type: 'Bookings', id: 'LIST' }] : [{ type: 'Bookings', id: 'LIST' }],
    }),
    getUserBookings: builder.query<TBooking[], number>({
      query: (userId) => `bookings/user/${userId}`,
      providesTags: (result) =>
        result ? [...result.map(({ bookingId }) => ({ type: 'Bookings', bookingId } as const)), { type: 'Bookings', id: 'LIST' }] : [{ type: 'Bookings', id: 'LIST' }],
    }),
    createBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: (newBooking) => ({
        url: 'bookings',
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: [{ type: 'Bookings', id: 'LIST' }],
    }),
    updateBooking: builder.mutation<TBooking, Partial<TBooking>>({
      query: ({ bookingId, ...rest }) => ({
        url: `bookings/${bookingId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (result, error, { bookingId }) => [{ type: 'Bookings', bookingId }],
    }),
    deleteBooking: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `bookings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Bookings', id }],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBookingsQuery,
  useGetUserBookingsQuery, // New hook for fetching user bookings
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation
}: any = bookingAPI;
