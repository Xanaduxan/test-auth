import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from '../src/features/userslice';

const store = configureStore({
  reducer: {
    users: userSlice,
  },
});
export default store;
export const useAppDispatch = useDispatch;
