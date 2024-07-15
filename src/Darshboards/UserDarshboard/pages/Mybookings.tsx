import React, { useState } from 'react';
import { 
  useGetBookingsQuery, 
  useUpdateBookingMutation, 
  // useDeleteBookingMutation, 
  TBooking 
} from '../../../Features/bookings/bookingAPI';
import { useCreateCheckoutSessionMutation } from '../../../Features/stripe/stripeAPI';
import styles from '../scss/MyBookings.module.scss';
import { Toaster, toast } from 'sonner';

const MyBookings: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.user.userId;
  const { data: bookings, error, isLoading } = useGetBookingsQuery(undefined, {
    pollingInterval: 1000 // Poll every 1000ms (1 second)
  });
  const [updateBooking] = useUpdateBookingMutation();
  // const [deleteBooking] = useDeleteBookingMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [loadingBookingId, setLoadingBookingId] = useState<number | null>(null);

  const handleUpdateBooking = async (booking: TBooking) => {
    setLoadingBookingId(booking.bookingId);
    try {
      const { data } = await createCheckoutSession({ bookingId: booking.bookingId, amount: Number(booking.totalAmount) });
      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl; // Redirect to the checkout URL
      } else {
        console.error('No checkout URL returned from the server');
        toast.error('No checkout URL returned from the server', { style: { background: 'red', color: 'white' }, position: 'top-right' });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error creating checkout session', { style: { background: 'red', color: 'white' }, position: 'top-right' });
    } finally {
      setLoadingBookingId(null);
    }
  };

  const handleDeleteBooking = async (booking: TBooking) => {
    try {
      console.log({ ...booking, bookingStatus: 'Cancelled' });
      await updateBooking({ ...booking, bookingStatus: 'Cancelled' }).unwrap();
      toast.success('Booking cancelled successfully', { style: { background: 'green', color: 'white' }, position: 'top-right' });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Error cancelling booking', { style: { background: 'red', color: 'white' }, position: 'top-right' });
    }
  };

  const userBookings = bookings?.filter((booking: TBooking) => booking.userId === userId);

  return (
    <div className={styles.myBookingsContainer}>
      <Toaster position="top-right" />
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
                  {booking.bookingStatus !== 'Cancelled' && (
                    <>
                      <button 
                        onClick={() => handleUpdateBooking(booking)} 
                        disabled={loadingBookingId === booking.bookingId}
                      >
                        {loadingBookingId === booking.bookingId ? 'Processing...' : 'Pay Now'}
                      </button>
                      <button onClick={() => handleDeleteBooking(booking)}>Cancel Booking</button>
                    </>
                  )}
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
