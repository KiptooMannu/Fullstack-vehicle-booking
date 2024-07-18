import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TTransaction {
    id: number;
    paymentId: number;
    bookingId: number;
    amount: number;
    paymentStatus: string;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
    createdAt: string;
    updatedAt: string;
    booking: {
        bookingId: number;
        user: {
            userId: number;
            fullName: string;
            email: string;
            contactPhone: string;
            address: string;
            role: string;
            createdAt: string;
            updatedAt: string;
        };
    };
}

// Define the API slice
export const transactionsAPI = createApi({
    reducerPath: 'transactionsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://car-rental-backend-1.onrender.com/api',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `${token.replace(/"/g, '')}`);
            }
            console.log(headers);
            return headers;
        },
    }),
    tagTypes: ['Transactions'],
    endpoints: (builder) => ({
        getTransactions: builder.query<TTransaction[], void>({
            query: () => 'payments',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Transactions', id } as const)),
                        { type: 'Transactions', id: 'LIST' },
                    ]
                    : [{ type: 'Transactions', id: 'LIST' }],
        }),
        createTransaction: builder.mutation<TTransaction, Partial<TTransaction>>({
            query: (newTransaction) => ({
                url: 'payments',
                method: 'POST',
                body: newTransaction,
            }),
            invalidatesTags: [{ type: 'Transactions', id: 'LIST' }],
        }),
        updateTransaction: builder.mutation<TTransaction, Partial<TTransaction>>({
            query: ({ paymentId, ...rest }) => ({
                url: `payments/${paymentId}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (_, __, { id }) => [{ type: 'Transactions', id }],
        }),
        deleteTransaction: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_, __, id) => [{ type: 'Transactions', id }],
        }),
    }),
});

// Export the auto-generated hooks
export const {
    useGetTransactionsQuery,
    useCreateTransactionMutation,
    useUpdateTransactionMutation,
    useDeleteTransactionMutation,
} = transactionsAPI;
