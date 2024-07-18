import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TBranch {
  branchId: number;
  name: string;
  contactPhone: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the API slice
export const branchesAPI = createApi({
  reducerPath: 'branchesAPI',
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
  tagTypes: ['Branches'],
  endpoints: (builder) => ({
    getBranches: builder.query<TBranch[], void>({
      query: () => 'branches',
      providesTags: (result) =>
        result ? [...result.map(({ branchId }) => ({ type: 'Branches', branchId } as const)), { type: 'Branches', id: 'LIST' }] : [{ type: 'Branches', id: 'LIST' }],
    }),
    getBranchById: builder.query<TBranch, number>({
      query: (branchId) => `branches/${branchId}`,
      providesTags: (_result, _error, branchId) => [{ type: 'Branches', branchId }],
    }),
    createBranch: builder.mutation<TBranch, Partial<TBranch>>({
      query: (newBranch) => ({
        url: 'branches',
        method: 'POST',
        body: newBranch,
      }),
      invalidatesTags: [{ type: 'Branches', id: 'LIST' }],
    }),
    updateBranch: builder.mutation<TBranch, Partial<TBranch>>({
      query: ({ branchId, ...rest }) => ({
        url: `branches/${branchId}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (_result, _error, { branchId }) => [{ type: 'Branches', branchId }],
    }),
    deleteBranch: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `branches/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Branches', id }],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetBranchesQuery,
  useGetBranchByIdQuery,
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation
} = branchesAPI;
