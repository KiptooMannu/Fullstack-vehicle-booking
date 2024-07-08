import React from 'react';
import { useGetVehiclesQuery, useCreateVehicleMutation, useUpdateVehicleMutation, useDeleteVehicleMutation } from './vehicleAPI';

interface TVehicle {
    id: number;
    category: string;
    type: string;
    rentalRate: string;
    specifications: {
        imgUrl: string;
        carName: string;
        groupSize: number;
    };
}

const Vehicles: React.FC = () => {
  const { data: vehicles, error, isLoading } = useGetVehiclesQuery();
  const [updateVehicle] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();
  const [addVehicle] = useCreateVehicleMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading vehicles</div>;
  }

  return (
    <div className="car__list">
      {vehicles?.map((vehicle: TVehicle) => {
        const { category, type, rentalRate, specifications } = vehicle;
        const { imgUrl, carName, groupSize } = specifications;
        
        return (
          <div key={vehicle.id} className="car__item">
            <div className="car__item-top">
              <div className="car__item-tile">
                <h3>{carName}</h3>
                <span>
                  <i className="ri-heart-line"></i>
                </span>
              </div>
              <p>{category}</p>
            </div>

            <div className="car__img">
              <img src={imgUrl} alt={carName} />
            </div>

            <div className="car__item-bottom">
              <div className="car__bottom-left">
                <p>
                  <i className="ri-user-line"></i> {groupSize}
                </p>
                <p>
                  <i className="ri-repeat-line"></i>
                  {type}
                </p>
              </div>

              <p className="car__rent">${rentalRate}/d</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Vehicles;
