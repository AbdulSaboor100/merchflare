import { configureStore } from "@reduxjs/toolkit";
import userSignInSlice from "./Features/userSignInSlice";
import getUserSlice from "./Features/getUserSlice";
import userSignUpSlice from "./Features/userSignUpSlice";
import userVerifySlice from "./Features/userVerifySlice";
import getMerchSlice from "./Features/getMerchSlice";

export const store = configureStore({
  reducer: {
    userSignIn: userSignInSlice,
    userSignUp: userSignUpSlice,
    getUser: getUserSlice,
    userVerify: userVerifySlice,
    getMerch: getMerchSlice,
  },
});
