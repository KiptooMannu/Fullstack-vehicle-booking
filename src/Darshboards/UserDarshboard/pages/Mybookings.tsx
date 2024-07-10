import React from 'react';
import { useGetBookingsQuery, TBooking  } from '../../../Features/bookings/bookingAPI'; // Adjust import path as needed
import styles from './MyBookings.module.scss';

const MyBookings: React.FC = () => {
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const { data: bookings, error, isLoading } = useGetBookingsQuery();

  const userBookings = bookings?.filter((booking: TBooking) => booking.userId === userId) || [];

  return (
    <div className={styles.myBookingsContainer}>
      <h2>My Bookings</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading bookings.</p>}
      {!isLoading && !error && userBookings.length === 0 && <p>No bookings found.</p>}
      {!isLoading && !error && userBookings.length > 0 && (
        <ul className={styles.bookingList}>
          {userBookings.map((booking: TBooking) => (
            <li key={booking.bookingId} className={styles.bookingItem}>
              <div><strong>Booking ID:</strong> {booking.bookingId}</div>
              <div><strong>Vehicle Model:</strong> {booking.vehicle.specifications.model}</div>
              <div><strong>Branch:</strong> {booking.branch.name}</div>
              <div><strong>Start Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</div>
              <div><strong>End Date:</strong> {new Date(booking.returnDate).toLocaleString()}</div>
              <div><strong>Total Amount:</strong> ${booking.totalAmount}</div>
              <div><strong>Status:</strong> {booking.bookingStatus}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
