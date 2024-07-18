import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TVehicle {
  id: number;
  vehicleId: number;
  rentalRate: string;
  availability: boolean;
  image: string;
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
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://car-rental-backend-1.onrender.com/api/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `${token.replace(/"/g, '')}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Vehicles'],
  endpoints: (builder) => ({
    getVehicles: builder.query<TVehicle[], void>({
      query: () => 'vehicles',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Vehicles', id } as const)),
              { type: 'Vehicles', id: 'LIST' },
            ]
          : [{ type: 'Vehicles', id: 'LIST' }],
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
      query: ({ vehicleId, ...rest }) => ({
        url: `vehicles/${vehicleId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (_result, _error, { vehicleId }) => [{ type: 'Vehicles', id: vehicleId }],
    }),
    deleteVehicle: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Vehicles', id }],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleAPI;
