import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken:null,
};

const notificationSlice = createSlice({
  name: "auth_slice",
  initialState,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { updateAccessToken } = notificationSlice.actions;
export default notificationSlice.reducer;