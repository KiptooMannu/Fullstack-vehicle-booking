import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TBooking {
    id: number;
    userId: number;
    carId: number;
    startDate: string;
    endDate: string;
    status: string;
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
                result ? [...result.map(({ id }) => ({ type: 'Bookings', id } as const)), { type: 'Bookings', id: 'LIST' }] : [{ type: 'Bookings', id: 'LIST' }],
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
            query: ({ id, ...rest }) => ({
                url: `bookings/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Bookings', id }],
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
    useCreateBookingMutation, 
    useUpdateBookingMutation, 
    useDeleteBookingMutation 
}: any = bookingAPI;
