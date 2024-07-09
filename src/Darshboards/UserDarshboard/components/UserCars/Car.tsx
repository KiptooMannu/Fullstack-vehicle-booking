// src/components/CarList.tsx

import React from 'react';
import { useGetVehiclesQuery } from '../../../../Features/vehicles/vehicleAPI';
import { TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import styles from './Carlist.module.scss';

const CarList: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Bars height="80" width="80" color="#4fa94d" ariaLabel="bars-loading" visible={true} />
        <p>Loading vehicles...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>Error loading vehicles</div>;
  }

  return (
    <div className={styles.carListContainer}>
      <h2>Available Vehicles</h2>
      {vehicles && vehicles.length > 0 ? (
        <ul className={styles.carList}>
          {vehicles.map((vehicle: TVehicle) => (
            <li key={vehicle.id} className={styles.carItem}>
              <img 
                src="https://via.placeholder.com/150" 
                alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`} 
                className={styles.carImage} 
              />
              <h3>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h3>
              <p>Year: {vehicle.specifications.year}</p>
              <p>Rent per Hour: ${vehicle.rentalRate}</p>
              <p>{vehicle.availability ? 'Available' : 'Not Available'}</p>
              <button 
                className={styles.detailsButton} 
                onClick={() => navigate(`/vehicle/${vehicle.id}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No vehicles available</p>
      )}
    </div>
  );
};

export default CarList;
