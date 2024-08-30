import { configureStore } from "@reduxjs/toolkit";
import authSlice from "/src/redux/slice/auth.slice";
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
export default store;