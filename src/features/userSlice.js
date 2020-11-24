import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    removeStatus: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    userInfo: (state, action) => {
      state.user.userInfo = action.payload;
    },
    removeStatusReducer: (state, action) => {
      console.log(action.payload);
      state.removeStatus = action.payload;
    },

    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state, action) => {
      state.user = null;
    },
  },
});

export const {
  login,
  logout,
  userInfo,
  setManager,
  removeStatusReducer,
} = userSlice.actions;

export const removeStatus = (state) => state.user.removeStatus;
export const selectUserEmail = (state) => state.user.email;
export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.user;
export const selectUserId = (state) => state.user.user.userId;
export default userSlice.reducer;
