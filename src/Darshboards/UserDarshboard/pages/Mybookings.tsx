import React, { useState } from 'react';
import { 
  useGetBookingsQuery, 
  useUpdateBookingMutation, 
  TBooking 
} from '../../../Features/bookings/bookingAPI';
import { useCreateCheckoutSessionMutation } from '../../../Features/stripe/stripeAPI';
import styles from '../scss/MyBookings.module.scss';
import { Toaster, toast } from 'sonner';

const MyBookings: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.user.userId;
  const { data: bookings, error, isLoading, refetch } = useGetBookingsQuery(undefined, {
    pollingInterval: 2000 // Poll every 2 seconds
  });
  const [updateBooking] = useUpdateBookingMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [loadingBookingId, setLoadingBookingId] = useState<number | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<number | null>(null);

  const handleUpdateBooking = async (booking: TBooking) => {
    setLoadingBookingId(booking.bookingId);
    try {
      const { data } = await createCheckoutSession({ bookingId: booking.bookingId, amount: Number(booking.totalAmount) });
      if (data?.checkoutUrl) {
        // Redirect to the checkout URL
        window.location.href = data.checkoutUrl;

        // Polling to refetch the booking data until the payment status is updated
        const interval = setInterval(async () => {
          await refetch();
          const updatedBooking = bookings?.find((b : any )=> b.bookingId === booking.bookingId);
          if (updatedBooking?.bookingStatus === 'Confirmed') {
            clearInterval(interval);
          }
        }, 2000);
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
    setCancellingBookingId(booking.bookingId);
    try {
      await updateBooking({ ...booking, bookingStatus: 'canceled' }).unwrap();
      toast.success('Booking cancelled successfully', { style: { background: 'green', color: 'white' }, position: 'top-right' });
      // Optimistically update the booking status in the UI
      booking.bookingStatus = 'canceled';
    } catch (error) {
      console.error('Error cancelling booking:', error);
      // toast.error('Error cancelling booking', { style: { background: 'red', color: 'white' }, position: 'top-right' });
    } finally {
      setCancellingBookingId(null);
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
                <td className={styles.lowercase}>{booking.bookingStatus}</td>
                <td>
                  {booking.bookingStatus !== 'canceled' && booking.bookingStatus !== 'confirmed' && (
                    <>
                      <button 
                        onClick={() => handleUpdateBooking(booking)} 
                        disabled={loadingBookingId === booking.bookingId}
                      >
                        {loadingBookingId === booking.bookingId ? 'Processing...' : 'Pay Now'}
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking)}
                        disabled={cancellingBookingId === booking.bookingId}
                      >
                        {cancellingBookingId === booking.bookingId ? 'Cancelling...' : 'Cancel Booking'}
                      </button>
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
