import { createSlice } from "@reduxjs/toolkit";

export const extraSlice = createSlice({
  name: "extra",
  initialState: {
    sidebar: false,
    modalStatus: false,
    deleteCustomerModal: false,
    filterStatus: false,
    searchIcon: false,
  },
  reducers: {
    showSideBar: (state, action) => {
      state.sidebar = !state.sidebar;
    },
    updateModalStatus: (state, action) => {
      state.modalStatus = !state.modalStatus;
    },
    updateDeleteCustomerModal: (state, action) => {
      state.deleteCustomerModal = !state.deleteCustomerModal;
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    updateSearch: (state, action) => {
      state.searchIcon = !state.searchIcon;
    },
  },
});

export const {
  showSideBar,
  updateModalStatus,
  updateDeleteCustomerModal,
  updateFilterStatus,
  updateSearch,
} = extraSlice.actions;

export const selectModalStatus = (state) => state.extra.modalStatus;
export const selectSidebar = (state) => state.extra.sidebar;
export const selectdeleteCustomerModal = (state) =>
  state.extra.deleteCustomerModal;
export const selectSearchIcon = (state) => state.extra.searchIcon;
export const selectFilterStatus = (state) => state.extra.filterStatus;

export default extraSlice.reducer;
