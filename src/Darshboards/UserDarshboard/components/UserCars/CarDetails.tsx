// src/components/UserCars/CarDetails.tsx

import React from 'react';
import { TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import styles from './CarDetails.module.scss';

interface CarDetailsProps {
  vehicle: TVehicle;
  onBack: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ vehicle, onBack }) => {
  return (
    <div className={styles.carDetailsContainer}>
      <button className={styles.backButton} onClick={onBack}>Back to List</button>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <h2>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
          <p><strong>Year:</strong> {vehicle.specifications.year}</p>
          <p><strong>Color:</strong> {vehicle.specifications.color}</p>
          <p><strong>Engine Capacity:</strong> {vehicle.specifications.engineCapacity}</p>
          <p><strong>Features:</strong> {vehicle.specifications.features}</p>
          <p><strong>Fuel Type:</strong> {vehicle.specifications.fuelType}</p>
          <p><strong>Seating Capacity:</strong> {vehicle.specifications.seatingCapacity}</p>
          <p><strong>Transmission:</strong> {vehicle.specifications.transmission}</p>
          <p><strong>Rent per Hour:</strong> ${vehicle.rentalRate}</p>
          <p><strong>Status:</strong> {vehicle.availability ? 'Available' : 'Not Available'}</p>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src="https://via.placeholder.com/150" 
            alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`} 
            className={styles.carImage} 
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
