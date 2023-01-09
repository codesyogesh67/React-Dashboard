import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import orderReducer from "../features/orderSlice";
import extraReducer from "../features/extraSlice";
import messageReducer from "../features/messageSlice";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["order", "user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  extra: extraReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
