import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Config";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { axiosErrorHandler, setCookie } from "../../utils/helper";
import { getUser } from "./getUserSlice";

const initialState = {
  isLoading: false,
  isError: null,
  errors: [],
  isSuccess: false,
  message: "",
};

export const userSignIn = createAsyncThunk(
  "Auth/User-SignIn",
  async ({ data, navigate, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/signin`,
        data
      );
      onSuccess && onSuccess();
      dispatch(getUser(response?.data?.token));
      setCookie("token", response?.data?.token);
      toastSuccess(response?.data?.message);
      navigate && navigate("/");
      return response?.data;
    } catch (error) {
      axiosErrorHandler(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSignInSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignIn.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
    });
    builder.addCase(userSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export default userSignInSlice?.reducer;
