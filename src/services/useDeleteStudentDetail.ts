import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const useDeleteStudentDetail = createApi({
    reducerPath: 'useDeleteStudentDetail',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        deleteStudentDetail: builder.mutation<any, any>({
        query: (id) => ({
            url: `student/${id}`,
            method: 'DELETE',
        }),
        }),
    }),
});

export const { useDeleteStudentDetailMutation } = useDeleteStudentDetail;