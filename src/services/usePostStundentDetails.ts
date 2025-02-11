import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usePostStudentDetails = createApi({
    reducerPath: 'usePostStudentDetails',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
    endpoints: (builder) => ({
        postStudentDetails: builder.mutation<any, any>({
        query: (body) => ({
            url: 'student',
            method: 'POST',
            body,
        }),
        }),
    }),
});

export const { usePostStudentDetailsMutation } = usePostStudentDetails;