import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const useGetStudentDetails = createApi({
  reducerPath: 'useGetStudentDetails',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/' }),
  endpoints: (builder) => ({
    getStudentDetails: builder.query<any, void>({
      query: () => 'student',
    }),
  }),
});

export const { useGetStudentDetailsQuery } = useGetStudentDetails;

