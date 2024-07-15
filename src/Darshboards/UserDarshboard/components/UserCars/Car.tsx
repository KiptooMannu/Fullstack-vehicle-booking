import React, { useState } from 'react';
import { useGetVehiclesQuery } from '../../../../Features/vehicles/vehicleAPI';
import { TVehicle } from '../../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import CarDetails from './CarDetails';
import styles from './Carlist.module.scss';
import ToyotaCamry from '../../../../images/cars/toyota-camry-hybrid.webp';
import ToyotaHilux from '../../../../images/cars/toyota-hilux.webp';
import BmwX4 from '../../../../images/cars/bmw-x4.webp';
import BmwX5 from '../../../../images/cars/bmw-x5.webp';
import ChevroletOnix from '../../../../images/cars/chevrolet-onix.webp';
import ChevroletSpin from '../../../../images/cars/chevrolet-spin.webp';
import FiatMobi from '../../../../images/cars/fiat-mobi.webp';
import FiatUno from '../../../../images/cars/fiat-uno.webp';
import VolkswagenGolf from '../../../../images/cars/volkswagen-golf.webp';
import VolkswagenBeetle from '../../../../images/cars/volkswagen-new-beetle.webp';

const CarList: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();
  const [selectedVehicle, setSelectedVehicle] = useState<{ vehicle: TVehicle, image: string } | null>(null);

  const images = [
    ToyotaCamry,
    ToyotaHilux,
    BmwX4,
    BmwX5,
    ChevroletOnix,
    ChevroletSpin,
    FiatMobi,
    FiatUno,
    VolkswagenGolf,
    VolkswagenBeetle
  ];

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
        <CarDetails vehicle={selectedVehicle.vehicle} image={selectedVehicle.image} onBack={() => setSelectedVehicle(null)} />
      ) : (
        <>
          <h2>Available Vehicles</h2>
          {vehicles && vehicles.length > 0 ? (
            <div className={styles.carList}>
              {vehicles.map((vehicle: TVehicle) => {
                const randomImage = images[Math.floor(Math.random() * images.length)];
                return (
                  <div key={vehicle.vehicleId} className={styles.carCard}>
                    <img
                      src={randomImage}
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
                        onClick={() => setSelectedVehicle({ vehicle, image: randomImage })}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No vehicles available</p>
          )}
        </>
      )}
    </div>
  );
};

export default CarList;
