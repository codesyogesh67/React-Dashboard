import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    userId: null,
  },
  reducers: {
    userProduct: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { userProduct } = productSlice.actions;

export const selectProductUser = (state) => state.product;

export default productSlice.reducer;
