import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    updateOrders: (state, action) => {
      console.log(action.payload);
      state.orders = action.payload;
    },
    emptyOrderList: (state, action) => {
      state.orders = [];
    },
  },
});

export const { updateOrders, emptyOrderList } = orderSlice.actions;

export const selectOrdersList = (state) => state.order.orders;

export default orderSlice.reducer;
