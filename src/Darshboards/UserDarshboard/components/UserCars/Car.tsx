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
  const [filters, setFilters] = useState({
    price: '',
    year: '',
    model: '',
    availability: 'all'
  });

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredVehicles = vehicles?.filter((vehicle: TVehicle) => {
    const matchesPrice = filters.price ? Number(vehicle.rentalRate) <= parseFloat(filters.price) : true;
    const matchesYear = filters.year ? vehicle.specifications.year === parseInt(filters.year) : true;
    const matchesModel = filters.model ? vehicle.specifications.model.toLowerCase().includes(filters.model.toLowerCase()) : true;
    const matchesAvailability = filters.availability === 'all' || (filters.availability === 'available' && vehicle.availability) || (filters.availability === 'not-available' && !vehicle.availability);

    return matchesPrice && matchesYear && matchesModel && matchesAvailability;
  });

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
          <div className={styles.filters}>
            <input
              type="number"
              name="price"
              placeholder="Max Price"
              value={filters.price}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={filters.year}
              onChange={handleFilterChange}
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={filters.model}
              onChange={handleFilterChange}
            />
            <select name="availability" value={filters.availability} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
          </div>
          {filteredVehicles && filteredVehicles.length > 0 ? (
            <div className={styles.carList}>
              {filteredVehicles.map((vehicle: TVehicle) => {
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
