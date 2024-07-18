import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the interface for fleet management
export interface TFleetManagement {
    fleetId: number;
    vehicleId: number;
    acquisitionDate: string;
    depreciationRate: number;
    currentValue: number;
    maintenanceCost: number;
    status: string;
}

// Define the API slice with token header
export const fleetManagementAPI = createApi({
    reducerPath: 'fleetManagementAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://car-rental-backend-1.onrender.com/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `${token.replace(/"/g, '')}`);
            }
            console.log(headers)
            return headers;
        },
    }),
    tagTypes: ['FleetManagement'],  // Define your tags here
    endpoints: (builder) => ({
        getFleetManagement: builder.query<TFleetManagement[], void>({
            query: () => 'fleet-management',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ fleetId }) => ({ type: 'FleetManagement', fleetId } as const)),
                          { type: 'FleetManagement', id: 'LIST' },
                      ]
                    : [{ type: 'FleetManagement', id: 'LIST' }],
        }),
        createFleetManagement: builder.mutation<TFleetManagement, Partial<TFleetManagement>>({
            query: (newFleetManagement) => ({
                url: 'fleet-management',
                method: 'POST',
                body: newFleetManagement,
            }),
            invalidatesTags: [{ type: 'FleetManagement', id: 'LIST' }],
        }),
        updateFleetManagement: builder.mutation<TFleetManagement, Partial<TFleetManagement>>({
            query: ({ fleetId, ...rest }) => ({
                url: `fleet-management/${fleetId}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (_result, _error, { fleetId }) => [{ type: 'FleetManagement', fleetId }],
        }),
        deleteFleetManagement: builder.mutation<{ success: boolean; fleetId: number }, number>({
            query: (fleetId) => ({
                url: `fleet-management/${fleetId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, fleetId) => [{ type: 'FleetManagement', fleetId }],
        }),
    }),
});

// Export the auto-generated hooks
export const { 
    useGetFleetManagementQuery, 
    useCreateFleetManagementMutation, 
    useUpdateFleetManagementMutation, 
    useDeleteFleetManagementMutation 
} = fleetManagementAPI;
