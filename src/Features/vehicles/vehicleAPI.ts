import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// src/Features/vehicles/vehicleAPI.ts

export interface TVehicle {
  id: number;
  vehicleId: number;
  rentalRate: string;
  availability: boolean;
  image:string;
  specifications: {
    color: string;
    engineCapacity: string;
    features: string;
    fuelType: string;
    seatingCapacity: number;
    manufacturer: string;
    model: string;
    transmission: string;
    year: number;
  };
}


// Define the API slice
export const vehicleAPI = createApi({
    reducerPath: 'vehicleAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://car-rental-backend-1.onrender.com/api' }),
    tagTypes: ['Vehicles'],  // Define your tags here
    endpoints: (builder) => ({
        getVehicles: builder.query<TVehicle[], void>({
            query: () => 'vehicles',
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'Vehicles', id } as const)), 
                    { type: 'Vehicles', id: 'LIST' }
                ] : [{ type: 'Vehicles', id: 'LIST' }],
        }),
        createVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
            query: (newVehicle) => ({
                url: 'vehicles',
                method: 'POST',
                body: newVehicle,
            }),
            invalidatesTags: [{ type: 'Vehicles', id: 'LIST' }],
        }),
        updateVehicle: builder.mutation<TVehicle, Partial<TVehicle>>({
            query: ({ id, ...rest }) => ({
                url: `vehicles/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Vehicles', id }],
        }),
        deleteVehicle: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `vehicles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Vehicles', id }],
        }),
    }),
});

// Export the auto-generated hooks
export const { 
    useGetVehiclesQuery, 
    useCreateVehicleMutation, 
    useUpdateVehicleMutation, 
    useDeleteVehicleMutation 
}: any = vehicleAPI;
