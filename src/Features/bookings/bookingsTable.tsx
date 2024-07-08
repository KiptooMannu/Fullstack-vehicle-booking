import React, { useState } from 'react';
import { useGetBookingsQuery, useUpdateBookingMutation, useDeleteBookingMutation } from './bookingAPI';
import { Toaster, toast } from 'sonner';
import './BookingTable.scss';

interface TBooking {
    bookingId: number;
    bookingDate: string;
    returnDate: string;
    bookingStatus: string;
    totalAmount: string;
    createdAt: string;
    updatedAt: string;
}

const BookingTable: React.FC = () => {
    const { data: bookingsData, error, isLoading, isError } = useGetBookingsQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    const handleDelete = async (bookingId: number) => {
        await deleteBooking(bookingId);
        toast.success(`Booking with id ${bookingId} deleted successfully`);
    };

    const handleUpdate = async (booking: TBooking) => {
        await updateBooking(booking);
        toast.success(`Booking with id ${booking.bookingId} updated successfully`);
    };

    const totalPages = bookingsData ? Math.ceil(bookingsData.length / recordsPerPage) : 0;
    const paginatedData = bookingsData ? bookingsData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage) : [];

    return (
        <>
            <Toaster
                toastOptions={{
                    classNames: {
                        error: 'error-toast',
                        success: 'success-toast',
                        warning: 'warning-toast',
                        info: 'info-toast',
                    },
                }}
            />
            <div className="booking-table-container">
                <h1 className='title'>Bookings Data</h1>

                <table className="booking-table">
                    <thead>
                        <tr>
                            <th>Booking Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={5}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={5}>Error loading data</td></tr>
                        ) : (
                            paginatedData && paginatedData.map((booking: TBooking) => (
                                <tr key={booking.bookingId}>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td>{new Date(booking.returnDate).toLocaleDateString()}</td>
                                    <td>
                                        <input type="text" value={booking.bookingStatus} onChange={(e) => handleUpdate({ ...booking, bookingStatus: e.target.value })} />
                                    </td>
                                    <td>
                                        <input type="text" value={booking.totalAmount} onChange={(e) => handleUpdate({ ...booking, totalAmount: e.target.value })} />
                                    </td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(booking)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(booking.bookingId)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={5}>{bookingsData ? `${bookingsData.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button key={page} className={`page-btn ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BookingTable;
