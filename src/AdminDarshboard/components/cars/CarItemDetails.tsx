import React, { useState } from 'react';
import { TVehicle } from '../../../Features/vehicles/vehicleAPI';
import styles from './CarItemDetails.module.scss';
import { useUpdateVehicleMutation, useDeleteVehicleMutation, useGetVehiclesQuery } from '../../../Features/vehicles/vehicleAPI';
import { toast, Toaster } from 'sonner';

interface CarDetailsProps {
  vehicle: TVehicle;
  image: string;
  onBack: () => void;
}

const CarDetails: React.FC<CarDetailsProps> = ({ vehicle, image, onBack }) => {
  const [updatedVehicle, setUpdatedVehicle] = useState(vehicle);
  const [isEditing, setIsEditing] = useState(false);
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const { refetch } = useGetVehiclesQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedVehicle((prevState) => ({
      ...prevState,
      specifications: {
        ...prevState.specifications,
        [name]: value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateVehicle(updatedVehicle).unwrap();
      toast.success('Vehicle updated successfully');
      setIsEditing(false);
      refetch();
    } catch (error) {
      console.error('Failed to update vehicle', error);
      toast.error('Failed to update vehicle');
    }
  };

  const handleDelete = async (vehicleId: number) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await deleteVehicle(vehicleId).unwrap();
        toast.success('Vehicle deleted successfully');
        onBack();
        refetch();
      } catch (error) {
        console.error('Failed to delete vehicle', error);
        toast.error('Failed to delete vehicle');
      }
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.carDetailsContainer}>
      <Toaster position="top-right" />
      <button className={styles.backButton} onClick={onBack}>Back to List</button>
      <div className={styles.detailsContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.details}>
            <h2>{vehicle.specifications.manufacturer} {vehicle.specifications.model}</h2>
            <div className={styles.specifications}>
              <div>
                <strong>Year:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="year" 
                    value={updatedVehicle.specifications.year} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.year}</span>
                )}
              </div>
              <div>
                <strong>Color:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="color" 
                    value={updatedVehicle.specifications.color} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.color}</span>
                )}
              </div>
              <div>
                <strong>Engine Capacity:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="engineCapacity" 
                    value={updatedVehicle.specifications.engineCapacity} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.engineCapacity}</span>
                )}
              </div>
              <div>
                <strong>Features:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="features" 
                    value={updatedVehicle.specifications.features} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.features}</span>
                )}
              </div>
              <div>
                <strong>Fuel Type:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="fuelType" 
                    value={updatedVehicle.specifications.fuelType} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.fuelType}</span>
                )}
              </div>
              <div>
                <strong>Seating Capacity:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="seatingCapacity" 
                    value={updatedVehicle.specifications.seatingCapacity} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.seatingCapacity}</span>
                )}
              </div>
              <div>
                <strong>Transmission:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="transmission" 
                    value={updatedVehicle.specifications.transmission} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  <span>{updatedVehicle.specifications.transmission}</span>
                )}
              </div>
              <div>
                <strong>Rent per Hour:</strong>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="rentalRate" 
                    value={updatedVehicle.rentalRate} 
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, rentalRate: e.target.value })} 
                  />
                ) : (
                  <span>{updatedVehicle.rentalRate}</span>
                )}
              </div>
              <div>
                <strong>Status:</strong>
                {isEditing ? (
                  <input 
                    type="checkbox" 
                    checked={updatedVehicle.availability} 
                    onChange={(e) => setUpdatedVehicle({ ...updatedVehicle, availability: e.target.checked })} 
                  />
                ) : (
                  <span>{updatedVehicle.availability ? 'Available' : 'Not Available'}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.adminActions}>
            {isEditing ? (
              <>
                <button
                  className={styles.updateButton}
                  onClick={handleUpdate}
                >
                  Save Changes
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={toggleEditMode}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={styles.editButton}
                onClick={toggleEditMode}
              >
                Edit Vehicle
              </button>
            )}
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(vehicle.vehicleId)}
            >
              Delete Vehicle
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src={image || "https://via.placeholder.com/1200x800"} 
            alt={`${vehicle.specifications.manufacturer} ${vehicle.specifications.model}`} 
            className={styles.carImage} 
          />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
