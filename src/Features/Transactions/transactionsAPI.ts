import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TTransaction {
    id: number;
    bookingId: number;
    userId: number;
    amount: string;
    transactionDate: string;
    status: string;
}

// Define the API slice
export const transactionsAPI = createApi({
    reducerPath: 'transactionsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://car-rental-backend-1.onrender.com/api' }),
    tagTypes: ['Transactions'],
    endpoints: (builder) => ({
        getTransactions: builder.query<TTransaction[], void>({ 
            query: () => 'payments',
            providesTags: (result) => 
                result ? [...result.map(({ id }) => ({ type: 'Transactions', id } as const)), { type: 'Transactions', id: 'LIST' }] : [{ type: 'Transactions', id: 'LIST' }],
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
            query: ({ id, ...rest }) => ({
                url: `payments/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Transactions', id }],
        }),
        deleteTransaction: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Transactions', id }],
        }),
    }),
});

// Export the auto-generated hooks
export const { 
    useGetTransactionsQuery, 
    useCreateTransactionMutation, 
    useUpdateTransactionMutation, 
    useDeleteTransactionMutation 
}: any = transactionsAPI;
