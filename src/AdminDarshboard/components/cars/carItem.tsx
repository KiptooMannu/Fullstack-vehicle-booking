import React, { useState } from 'react';
import { useGetVehiclesQuery, useCreateVehicleMutation } from '../../../Features/vehicles/vehicleAPI';
import { TVehicle } from '../../../Features/vehicles/vehicleAPI';
import { Bars } from 'react-loader-spinner';
import { toast, Toaster } from 'sonner';
// import 'sonner/dist/sonner.css';
import CarItemDetails from './CarItemDetails';
import styles from './CarItem.module.scss';
import ToyotaCamry from '../../../images/cars/toyota-camry-hybrid.webp';
import ToyotaHilux from '../../../images/cars/toyota-hilux.webp';
import BmwX4 from '../../../images/cars/bmw-x4.webp';
import BmwX5 from '../../../images/cars/bmw-x5.webp';
import ChevroletOnix from '../../../images/cars/chevrolet-onix.webp';
import ChevroletSpin from '../../../images/cars/chevrolet-spin.webp';
import FiatMobi from '../../../images/cars/fiat-mobi.webp';
import FiatUno from '../../../images/cars/fiat-uno.webp';
import VolkswagenGolf from '../../../images/cars/volkswagen-golf.webp';
import VolkswagenBeetle from '../../../images/cars/volkswagen-new-beetle.webp';

const AdminCarList: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();
  const [createVehicle] = useCreateVehicleMutation();
  const [selectedVehicle, setSelectedVehicle] = useState<{ vehicle: TVehicle, image: string } | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newCar, setNewCar] = useState({
    manufacturer: '',
    model: '',
    year: '',
    fuelType: '',
    engineCapacity: '',
    transmission: '',
    seatingCapacity: '',
    color: '',
    features: '',
    rentalRate: '',
    availability: true,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setNewCar({
        ...newCar,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setNewCar({
        ...newCar,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVehicle(newCar).unwrap();
      toast.success('Vehicle added successfully', {
        style: { background: 'green', color: 'white' },
        position: 'top-right'
      });
      setIsFormOpen(false);
      setNewCar({
        manufacturer: '',
        model: '',
        year: '',
        fuelType: '',
        engineCapacity: '',
        transmission: '',
        seatingCapacity: '',
        color: '',
        features: '',
        rentalRate: '',
        availability: true,
      });
    } catch (error) {
      toast.error('Failed to add vehicle', {
        style: { background: 'red', color: 'white' },
        position: 'top-right'
      });
      console.error('Failed to add vehicle:', error);
    }
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
      <Toaster />
      {selectedVehicle ? (
        <CarItemDetails vehicle={selectedVehicle.vehicle} image={selectedVehicle.image} onBack={() => setSelectedVehicle(null)} />
      ) : (
        <>
          <h2>Manage Vehicles</h2>
          <button className={styles.addButton} onClick={() => setIsFormOpen(!isFormOpen)}>
            {isFormOpen ? 'Close Form' : 'Add New Car'}
          </button>
          {isFormOpen && (
            <form className={styles.newCarForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Manufacturer</label>
                <input type="text" name="manufacturer" value={newCar.manufacturer} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Model</label>
                <input type="text" name="model" value={newCar.model} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Year</label>
                <input type="number" name="year" value={newCar.year} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Fuel Type</label>
                <input type="text" name="fuelType" value={newCar.fuelType} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Engine Capacity</label>
                <input type="text" name="engineCapacity" value={newCar.engineCapacity} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Transmission</label>
                <input type="text" name="transmission" value={newCar.transmission} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Seating Capacity</label>
                <input type="number" name="seatingCapacity" value={newCar.seatingCapacity} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Color</label>
                <input type="text" name="color" value={newCar.color} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Features</label>
                <textarea name="features" value={newCar.features} onChange={handleInputChange} required></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Rental Rate</label>
                <input type="number" name="rentalRate" value={newCar.rentalRate} onChange={handleInputChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>Availability</label>
                <input type="checkbox" name="availability" checked={newCar.availability} onChange={handleInputChange} />
              </div>
              <button type="submit" className={styles.submitButton}>Add Car</button>
            </form>
          )}
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

export default AdminCarList;
