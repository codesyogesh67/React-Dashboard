import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import productReducer from "../features/productSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
