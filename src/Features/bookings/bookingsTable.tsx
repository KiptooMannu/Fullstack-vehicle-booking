import React from 'react';
import { useGetBookingsQuery, useUpdateBookingMutation, useDeleteBookingMutation } from './bookingAPI';
import { Toaster, toast } from 'sonner';
import './UserTable.scss';

interface TBooking {
    id: number;
    userId: number;
    carId: number;
    startDate: string;
    endDate: string;
    status: string;
}

const BookingTable: React.FC = () => {
    const { data: bookingsData,  isLoading, isError } = useGetBookingsQuery();
    const [updateBooking] = useUpdateBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();
    console.log(bookingsData)

    const handleDelete = async (bookingId: number) => {
        await deleteBooking(bookingId);
        toast.success(`Booking with id ${bookingId} deleted successfully`);
    };

    const handleUpdate = async (booking: TBooking) => {
        await updateBooking(booking);
        toast.success(`Booking with id ${booking.id} updated successfully`);
    };

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
            <div className="user-table-container">
                <h1 className='title'>Booking Data</h1>

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Car ID</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={7}>Loading...</td></tr>
                        ) : isError ? (
                            <tr><td colSpan={7}>Error loading data</td></tr>
                        ) : (
                            bookingsData && bookingsData.map((booking: TBooking) => (
                                <tr key={booking.id}>
                                    <td>{booking.id}</td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={booking.userId} 
                                            onChange={(e) => handleUpdate({ ...booking, userId: Number(e.target.value) })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="number" 
                                            value={booking.carId} 
                                            onChange={(e) => handleUpdate({ ...booking, carId: Number(e.target.value) })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={booking.startDate} 
                                            onChange={(e) => handleUpdate({ ...booking, startDate: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={booking.endDate} 
                                            onChange={(e) => handleUpdate({ ...booking, endDate: e.target.value })} 
                                        />
                                    </td>
                                    <td>
                                        <input 
                                            type="text" 
                                            value={booking.status} 
                                            onChange={(e) => handleUpdate({ ...booking, status: e.target.value })} 
                                        />
                                    </td>
                                    <td className='options'>
                                        <button className='btn btn-info' onClick={() => handleUpdate(booking)}>Update</button>
                                        <button className='btn btn-warning' onClick={() => handleDelete(booking.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                    <tfoot>
                        <tr><td colSpan={7}>{bookingsData ? `${bookingsData.length} records` : '0 records'}</td></tr>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default BookingTable;
