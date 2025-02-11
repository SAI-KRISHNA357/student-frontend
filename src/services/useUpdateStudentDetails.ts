import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const useUpdateStudentDetails = createApi({
    reducerPath: 'useUpdateStudentDetails',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        updateStudentDetails: builder.mutation<any, any>({
        query: (body) => ({
            url: 'student',
            method: 'PUT',
            body,
        }),
        }),
    }),
});
export const { useUpdateStudentDetailsMutation } = useUpdateStudentDetails;