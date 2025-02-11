import { configureStore } from '@reduxjs/toolkit';
import { useGetStudentDetails } from '../services/useGetStudentDetails.ts';
import { usePostStudentDetails } from '../services/usePostStundentDetails.ts';
import { useUpdateStudentDetails } from '../services/useUpdateStudentDetails.ts';
import { useDeleteStudentDetail } from '../services/useDeleteStudentDetail.ts';

const store = configureStore({
  reducer: {
    [useGetStudentDetails.reducerPath]: useGetStudentDetails.reducer,
    [usePostStudentDetails.reducerPath]: usePostStudentDetails.reducer,
    [useUpdateStudentDetails.reducerPath]: useUpdateStudentDetails.reducer,
    [useDeleteStudentDetail.reducerPath]: useDeleteStudentDetail.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(useGetStudentDetails.middleware)
  .concat(usePostStudentDetails.middleware)
  .concat(useUpdateStudentDetails.middleware)
  .concat(useDeleteStudentDetail.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;