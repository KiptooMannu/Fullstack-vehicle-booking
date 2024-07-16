import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TUser {
    id: number;
    userId: number;
    fullname: string;
    email: string;
    phone: string;
    address: string;
}

// Define the API slice
export const usersAPI = createApi({
    reducerPath: 'usersAPI',
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
    tagTypes: ['Users'],  // Define your tags here
    endpoints: (builder) => ({
        getUsers: builder.query<TUser[], void>({
            query: () => 'users',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),
        createUser: builder.mutation<TUser, Partial<TUser>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        updateUser: builder.mutation<TUser, Partial<TUser>>({
            query: ({ userId, ...rest }) => ({
                url: `users/${userId}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: [{ type: 'Users'}],
        }),
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
    }),
});

// Export the auto-generated hooks
export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
}: any = usersAPI;
