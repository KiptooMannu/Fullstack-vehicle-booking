import React from 'react';
import { 
  useGetBookingsQuery, 
  useUpdateBookingMutation, 
  useDeleteBookingMutation, 
  TBooking 
} from '../../../Features/bookings/bookingAPI'; // Adjust import path as needed
import styles from '../scss/MyBookings.module.scss';

const MyBookings: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const { data: bookings, error, isLoading } = useGetBookingsQuery(userId); // Pass the user ID

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

  return (
    <div className={styles.myBookingsContainer}>
      <h2>My Bookings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading bookings.</p>}
      {!isLoading && !error && bookings?.length === 0 && <p>No bookings found.</p>}
      {!isLoading && !error && bookings && (
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
            {bookings.map((booking: TBooking) => (
              <tr key={booking.bookingId} className={styles.bookingRow}>
                <td>{booking.bookingId}</td>
                <td>{booking.vehicle?.specifications?.model || 'Unknown'}</td>
                <td>{booking.branch?.name || 'Unknown'}</td>
                <td>{new Date(booking.bookingDate).toLocaleString()}</td>
                <td>{new Date(booking.returnDate).toLocaleString()}</td>
                <td>${booking.totalAmount}</td>
                <td>{booking.bookingStatus}</td>
                <td>
                  <button onClick={() => handleUpdateBooking(booking.bookingId)}>Update</button>
                  <button onClick={() => handleDeleteBooking(booking.bookingId)}>Cancel Boooking</button>
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
