// src/components/CarList.tsx

import React from 'react';
import { useGetVehiclesQuery, TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import styles from './Carlist.module.scss';

const CarList: React.FC = () => {
  const history = useHistory(); // Initialize useHistory

  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();

  const navigateToCarDetails = (id: number) => {
    history.push(`/car/${id}`); // Navigate to car details page with car id
  };

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
              <h3>{vehicle.make} {vehicle.model}</h3>
              <p>Year: {vehicle.year}</p>
              <p>Rent per Hour: ${vehicle.rentPerHour}</p>
              <button onClick={() => navigateToCarDetails(vehicle.id)}>View Details</button>
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
