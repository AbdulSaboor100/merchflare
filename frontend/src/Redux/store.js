import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./Features/userLoginSlice";
import getUserSlice from "./Features/getUserSlice";

export const store = configureStore({
  reducer: {
    userLogin: userLoginSlice,
    getUser: getUserSlice,
  },
});
