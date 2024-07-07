// src/Features/login/loginAPI.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface logInUser {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        role: 'admin' | 'user';
        fullName: string;
        email: string;
    };
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://car-rental-backend-1.onrender.com/api' }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, Partial<logInUser>>({
            query: (user) => ({
                url: 'login',
                method: 'POST',
                body: user,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginUserMutation, useLogoutMutation } = loginAPI;
