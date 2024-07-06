import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TUser {
    id: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

// Define the API slice
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void> ({ query: () => 'users',
            providesTags: ['getUsers'],
         }),
        createUser: builder.mutation<TUser,Partial<TUser>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
                providesTags: ['createUser'],
            }),
            invalidatesTags: ['getUsers'],
        }),
        updateUser: builder.mutation<TUser,Partial<TUser>>({
            query: ({ id, ...rest }) => ({
                url: `users/${id}`,
                method: 'PUT',
                body: rest,
                providesTags: ['updateUser'],
            }),
            invalidatesTags: ['getUsers'],
        }),
        deleteUser: builder.mutation<{success: boolean; id:number}, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
                providesTags: ['deleteUser'],
            }),
            invalidatesTags: ['getUsers'],
        }),
    }),
});

// Export the auto-generated hooks
export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersAPI;