import { configureStore } from "@reduxjs/toolkit";
import adminLoginSlice from "./Features/adminLoginSlice";

export const store = configureStore({
  reducer: {
    adminLogin: adminLoginSlice,
  },
});
