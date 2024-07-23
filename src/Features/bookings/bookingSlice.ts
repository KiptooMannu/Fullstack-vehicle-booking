// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { TBooking } from './bookingAPI';
// import { useGetBookingsQuery, useUpdateBookingMutation } from './bookingAPI';

// interface BookingsState {
//   bookings: TBooking[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: BookingsState = {
//   bookings: [],
//   loading: false,
//   error: null,
// };

// export const fetchBookings = createAsyncThunk<TBooking[], void, { rejectValue: string }>(
//   'bookings/fetchBookings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await useGetBookingsQuery(undefined, { skip: true });
//       if (!response.data) throw new Error('No data');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
//     }
//   }
// );

// export const updateBookingStatus = createAsyncThunk<TBooking, { booking: TBooking, status: string }, { rejectValue: string }>(
//   'bookings/updateBookingStatus',
//   async ({ booking, status }, { rejectWithValue }) => {
//     try {
//       const response = await useUpdateBookingMutation({ ...booking, bookingStatus: any });
//       if (!response) throw new Error('No data');
//       return response;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Failed to update booking status');
//     }
//   }
// );

// const bookingsSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<TBooking[]>) => {
//         state.bookings = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchBookings.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.error = action.payload || 'Failed to fetch bookings';
//         state.loading = false;
//       })
//       .addCase(updateBookingStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateBookingStatus.fulfilled, (state, action: PayloadAction<TBooking>) => {
//         const updatedBooking = action.payload;
//         const index = state.bookings.findIndex((b:any) => b.bookingId === updatedBooking.bookingId);
//         if (index !== -1) {
//           state.bookings[index] = updatedBooking;
//         }
//         state.loading = false;
//       })
//       .addCase(updateBookingStatus.rejected, (state, action: PayloadAction<string | undefined>) => {
//         state.error = action.payload || 'Failed to update booking status';
//         state.loading = false;
//       });
//   },
// });

// export default bookingsSlice.reducer;
