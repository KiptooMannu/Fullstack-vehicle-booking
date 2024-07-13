import React from 'react';
import { 
  useGetBookingsQuery, 
  useUpdateBookingMutation, 
  useDeleteBookingMutation, 
  TBooking 
} from '../../../Features/bookings/bookingAPI';
import styles from '../scss/MyBookings.module.scss';

const MyBookings: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.user.userId;
  const { data: bookings, error, isLoading } = useGetBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();

  const handleUpdateBooking = (bookingId: number) => {
    const updatedData = {
      bookingStatus: 'confirmed', // Example of update data
      // Add other fields that you want to update
    };
    updateBooking({ bookingId, ...updatedData });
  };

  const handleDeleteBooking = (bookingId: number) => {
    deleteBooking(bookingId);
  };

  const userBookings = bookings?.filter((booking: TBooking) => booking.userId === userId);

  return (
    <div className={styles.myBookingsContainer}>
      <h2>My Bookings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading bookings.</p>}
      {!isLoading && !error && userBookings?.length === 0 && <p>No bookings found.</p>}
      {!isLoading && !error && userBookings && (
        <table className={styles.bookingTable}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vehicle Model</th>
              <th>Branch</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userBookings.map((booking: TBooking) => (
              <tr key={booking.bookingId} className={styles.bookingRow}>
                <td>{booking.bookingId}</td>
                <td>{booking.vehicle?.specifications?.model || 'Unknown'}</td>
                <td>{booking.branch?.name || 'Unknown'}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                <td>{new Date(booking.returnDate).toLocaleString()}</td>
                <td>${booking.totalAmount}</td>
                <td>{booking.bookingStatus}</td>
                <td>
                  <button onClick={() => handleUpdateBooking(booking.bookingId)}>Make Payment</button>
                  <button onClick={() => handleDeleteBooking(booking.bookingId)}>Cancel Booking</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
