// src/components/UserCars/CarDetails.tsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetVehiclesQuery } from '../../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import styles from './CarDetails.module.scss';

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, error, isLoading } = useGetVehiclesQuery(Number(id));

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
        <p>Loading vehicle details...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error loading vehicle details</div>;
  }

  return (
    <div className={styles.carDetailsContainer}>
      {vehicle ? (
        <>
          <h2>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
          <img 
            src="https://via.placeholder.com/150" 
            alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`} 
            className={styles.carImage} 
          />
          <p>Year: {vehicle.specifications.year}</p>
          <p>Color: {vehicle.specifications.color}</p>
          <p>Engine Capacity: {vehicle.specifications.engineCapacity}</p>
          <p>Features: {vehicle.specifications.features}</p>
          <p>Fuel Type: {vehicle.specifications.fuelType}</p>
          <p>Seating Capacity: {vehicle.specifications.seatingCapacity}</p>
          <p>Transmission: {vehicle.specifications.transmission}</p>
          <p>Rent per Hour: ${vehicle.rentalRate}</p>
          <p>{vehicle.availability ? 'Available' : 'Not Available'}</p>
        </>
      ) : (
        <p>Vehicle not found</p>
      )}
    </div>
  );
};

export default CarDetails;
