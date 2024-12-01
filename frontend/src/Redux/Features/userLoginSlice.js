import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Config";
import axios from "axios";
// import { toastError, toastSuccess } from "../../utils/toast";
import { axiosErrorHandler, setCookie } from "../../utils/helper";
import { getAdmin } from "./getUserSlice";

const initialState = {
  isLoading: false,
  isError: null,
  errors: [],
  isSuccess: false,
  message: "",
};

export const userLogin = createAsyncThunk(
  "Auth/User-Login",
  async (
    { data, navigate, rememberMe, onSuccess },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/user/signin`,
        data
      );
      onSuccess && onSuccess();
      dispatch(getAdmin(response?.data?.token));
      setCookie("token", response?.data?.token, rememberMe);
      // toastSuccess(response?.data?.message);
      navigate && navigate("/");
      return response?.data;
    } catch (error) {
      axiosErrorHandler(error);
      // toastError(error?.response?.data?.errors[0]?.message || "Network error");
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userLoginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export default userLoginSlice?.reducer;
