import React, { useState } from 'react';
import { useGetVehiclesQuery} from '../../../Features/vehicles/vehicleAPI';
import { TVehicle } from '../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import CarItemDetails from './CarItemDetails';
import styles from './CarItem.module.scss';
import ToyotaCamry from '../../images/cars/toyota-camry-hybrid.webp';
import ToyotaHilux from '../images/cars/toyota-hilux.webp';
import BmwX4 from '../images/cars/bmw-x4.webp';
import BmwX5 from '../images/cars/bmw-x5.webp';
import ChevroletOnix from '../images/cars/chevrolet-onix.webp';
import ChevroletSpin from '../images/cars/chevrolet-spin.webp';
import FiatMobi from '../images/cars/fiat-mobi.webp';
import FiatUno from '../images/cars/fiat-uno.webp';
import VolkswagenGolf from '../images/cars/volkswagen-golf.webp';
import VolkswagenBeetle from '../images/cars/volkswagen-new-beetle.webp';


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
