import React, { useState } from 'react';
import { TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CarDetails.module.scss';
import { CalendarIcon } from '@heroicons/react/24/outline'; // Importing icons from Heroicons
import { useCreateBookingMutation } from '../../../../Features/bookings/bookingAPI'; // Import the hook

interface CarDetailsProps {
  vehicle: TVehicle;
  onBack: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ vehicle, onBack }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [createBooking] = useCreateBookingMutation(); // Use the mutation hook

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    calculateTotalAmount(date, endDate);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    calculateTotalAmount(startDate, date);
  };

  const calculateTotalAmount = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const rate = parseFloat(vehicle.rentalRate);
      setTotalAmount(hours * rate);
    }
  };

  const handleBooking = async () => {
    const bookingData = {
      userId: parseInt(localStorage.getItem('userId') || '0', 10), // Assume user ID is stored in localStorage
      vehicleId: vehicle.id, // Assuming `id` is a property of TVehicle
      branchId: 3, // Placeholder, change as needed
      bookingDate: startDate?.toISOString() || '',
      returnDate: endDate?.toISOString() || '',
      totalAmount: totalAmount,
    };

    try {
      console.log(bookingData)
      await createBooking(bookingData).unwrap();
      alert('Booking successful!');
    } catch (error) {
      alert('Booking failed: ' );
    }
  };

  const today = new Date();

  return (
    <div className={styles.carDetailsContainer}>
      <button className={styles.backButton} onClick={onBack}>Back to List</button>
      <div className={styles.detailsContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.details}>
            <h2>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
            <div className={styles.specifications}>
              <div><strong>Year:</strong> {vehicle.specifications.year}</div>
              <div><strong>Color:</strong> {vehicle.specifications.color}</div>
              <div><strong>Engine Capacity:</strong> {vehicle.specifications.engineCapacity}</div>
              <div><strong>Features:</strong> {vehicle.specifications.features}</div>
              <div><strong>Fuel Type:</strong> {vehicle.specifications.fuelType}</div>
              <div><strong>Seating Capacity:</strong> {vehicle.specifications.seatingCapacity}</div>
              <div><strong>Transmission:</strong> {vehicle.specifications.transmission}</div>
              <div><strong>Rent per Hour:</strong> ${vehicle.rentalRate}</div>
              <div><strong>Status:</strong> {vehicle.availability ? 'Available' : 'Not Available'}</div>
            </div>
          </div>
          {vehicle.availability && (
            <div className={styles.bookingContainer}>
              <h3>Book this Vehicle</h3>
              <div className={styles.datePickerContainer}>
                <label>
                  <CalendarIcon className={styles.calendarIcon} />
                  Start Date:
                </label>
                <DatePicker 
                  selected={startDate} 
                  onChange={handleStartDateChange} 
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={today}
                  className={styles.datePicker}
                />
              </div>
              <div className={styles.datePickerContainer}>
                <label>
                  <CalendarIcon className={styles.calendarIcon} />
                  End Date:
                </label>
                <DatePicker 
                  selected={endDate} 
                  onChange={handleEndDateChange} 
                  showTimeSelect
                  dateFormat="Pp"
                  minDate={today}
                  className={styles.datePicker}
                />
              </div>
              <p className={styles.totalAmount}><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
              <button onClick={handleBooking} className={styles.bookButton}>Book Now</button>
            </div>
          )}
        </div>
        <div className={styles.imageContainer}>
          {vehicle.availability ? (
            <img 
              src={vehicle.image || "https://via.placeholder.com/1200x800"} 
              alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`} 
              className={styles.carImage} 
            />
          ) : (
            <img 
              src="https://via.placeholder.com/1200x800?text=Not+Available" 
              alt="Not Available" 
              className={styles.carImage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
