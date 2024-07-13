import React, { useState } from 'react';
import { TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './CarDetails.module.scss';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useCreateBookingMutation } from '../../../../Features/bookings/bookingAPI';
import { toast, Toaster } from 'sonner';
import { TBranch, useGetBranchesQuery } from '../../../../Features/Branches/BranchesAPI';
import { useNavigate } from 'react-router-dom';

interface CarDetailsProps {
  vehicle: TVehicle;
  onBack: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ vehicle, onBack }) => {
  const { data: branchesData, isLoading: isBranchesLoading, isError: isBranchesError } = useGetBranchesQuery();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedBranch, setSelectedBranch] = useState<number | null>(null);
  const [createBooking] = useCreateBookingMutation();
  const navigate = useNavigate();

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
    if (!selectedBranch) {
      toast.error('Please select a branch.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.user.userId;

    const bookingData = {
      userId,
      vehicleId: vehicle.vehicleId,
      branchId: selectedBranch,
      bookingDate: startDate?.toISOString() || '',
      returnDate: endDate?.toISOString() || '',
      totalAmount: totalAmount,
    };

    try {
      await createBooking(bookingData).unwrap();
      toast.success('Booking successful!');
      navigate('/users/bookings'); // Redirect to My Bookings page
    } catch (error) {
      toast.error('Booking failed.');
    }
  };

  const today = new Date();

  return (
    <div className={styles.carDetailsContainer}>
      <Toaster position="top-right" />
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
              <div className={styles.dropdownContainer}>
                <label>Select Branch:</label>
                {isBranchesLoading ? (
                  <p>Loading branches...</p>
                ) : isBranchesError ? (
                  <p>Error loading branches</p>
                ) : (
                  <select
                    value={selectedBranch || ''}
                    onChange={(e) => setSelectedBranch(Number(e.target.value))}
                    className={styles.dropdown}
                  >
                    <option value="" disabled>Select a branch</option>
                    {branchesData.map((branch: TBranch) => (
                      <option key={branch.branchId} value={branch.branchId}>
                        {branch.name} - {branch.city}
                      </option>
                    ))}
                  </select>
                )}
              </div>
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
