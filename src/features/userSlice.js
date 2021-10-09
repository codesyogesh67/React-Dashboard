import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userInfo: "",
    usersList: [],
    prevUsersList: [],
    filteredList: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    updatePrevUsersList: (state, action) => {
      state.prevUsersList = action.payload;
    },
    updateFilterdList: (state, action) => {
      state.filteredList = action.payload;
    },

    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    logout: (state, action) => {
      state.user = null;
      state.prevUsersList = [];
      state.usersList = [];
      state.userInfo = null;
    },
  },
});

export const {
  login,
  logout,
  updateUserInfo,

  setManager,

  updatePrevUsersList,
  updateFilterdList,
} = userSlice.actions;

export const selectUserEmail = (state) => state.user.email;
export const selectUser = (state) => state.user.user;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectFilteredList = (state) => state.user.filteredList;
export const selectPrevUsersList = (state) => state.user.prevUsersList;

export default userSlice.reducer;
