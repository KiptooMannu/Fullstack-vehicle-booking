import React, { useState } from 'react';
import { useGetBookingsQuery, useUpdateBookingMutation, useDeleteBookingMutation, TBooking } from './bookingAPI';
import { Toaster, toast } from 'sonner';
import './BookingsTable.scss';


const BookingTable: React.FC = () => {
    const { data: bookingsData, isLoading, isError } = useGetBookingsQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const [editMode, setEditMode] = useState<number | null>(null);
    const [updatedBooking, setUpdatedBooking] = useState<TBooking | null>(null);

    const handleDelete = async (bookingId: number) => {
        await deleteBooking(bookingId);
        toast.success(`Booking with id ${bookingId} deleted successfully`);
    };

    const handleEdit = (booking: TBooking) => {
        setEditMode(booking.bookingId);
        setUpdatedBooking(booking);
    };

    const handleCancel = () => {
        setEditMode(null);
        setUpdatedBooking(null);
    };

    const handleUpdate = async () => {
        if (updatedBooking) {
            await updateBooking(updatedBooking);
            toast.success(`Booking with id ${updatedBooking.bookingId} updated successfully`);
            setEditMode(null);
            setUpdatedBooking(null);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedBooking) {
            const { name, value } = e.target;
            setUpdatedBooking({ ...updatedBooking, [name]: value });
        }
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
                                        {editMode === booking.bookingId ? (
                                            <input
                                                type="text"
                                                name="bookingStatus"
                                                value={updatedBooking?.bookingStatus || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            booking.bookingStatus
                                        )}
                                    </td>
                                    <td>
                                        {editMode === booking.bookingId ? (
                                            <input
                                                type="text"
                                                name="totalAmount"
                                                value={updatedBooking?.totalAmount || ''}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            booking.totalAmount
                                        )}
                                    </td>
                                    <td className='options'>
                                        {editMode === booking.bookingId ? (
                                            <>
                                                <button className='btn btn-success' onClick={handleUpdate}>Save</button>
                                                <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className='btn btn-info' onClick={() => handleEdit(booking)}>Edit</button>
                                                <button className='btn btn-warning' onClick={() => handleDelete(booking.bookingId)}>Delete</button>
                                            </>
                                        )}
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
