import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: { messageStatus: false, message: "" },
  reducers: {
    updateMessageStatus: (state, action) => {
      state.messageStatus = action.payload;
    },
    updateMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage, updateMessageStatus } = messageSlice.actions;
export const selectMessage = (state) => state.message.message;
export const selectMessageStatus = (state) => state.message.messageStatus;
export default messageSlice.reducer;
