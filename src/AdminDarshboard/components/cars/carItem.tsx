import React, { useState } from 'react';
import { useGetVehiclesQuery} from '../../../Features/vehicles/vehicleAPI';
import { TVehicle } from '../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import CarItemDetails from './CarItemDetails';
import styles from './CarItem.module.scss';

const AdminCarList: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<TVehicle | null>(null);



  

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
      {selectedVehicle ? (
        <CarItemDetails vehicle={selectedVehicle} onBack={() => setSelectedVehicle(null)} />
      ) : (
        <>
          <h2>Manage Vehicles</h2>
          {vehicles && vehicles.length > 0 ? (
            <div className={styles.carList}>
              {vehicles.map((vehicle: TVehicle) => (
                <div key={vehicle.vehicleId} className={styles.carCard}>
                  <img
                    src="https://via.placeholder.com/150"
                    alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`}
                    className={styles.carImage}
                  />
                  <div className={styles.carContent}>
                    <h3>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h3>
                    <p>Year: {vehicle.specifications.year}</p>
                    <p>Rent per Hour: ${vehicle.rentalRate}</p>
                    <p>{vehicle.availability ? 'Available' : 'Not Available'}</p>
                    <button
                      className={styles.detailsButton}
                      onClick={() => setSelectedVehicle(vehicle)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No vehicles available</p>
          )}
        </>
      )}
    </div>
  );
};

export default AdminCarList;
