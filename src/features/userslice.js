import { createSlice } from '@reduxjs/toolkit';

import data from '../users.json';

const initialState = {
  users: data,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('isAuth', 'true');
      const user = action.payload.name;
      localStorage.setItem('name', user);
    },
    logoutUser: () => {
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;

export const { addUser, logoutUser } = userSlice.actions;
