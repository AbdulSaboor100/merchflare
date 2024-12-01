import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Config";
import axios from "axios";
// import { toastError, toastSuccess } from "../../utils/toast";
import { axiosErrorHandler, setCookie } from "../../utils/helper";
import { getAdmin } from "./getAdminSlice";

const initialState = {
  isLoading: false,
  isError: null,
  errors: [],
  isSuccess: false,
  message: "",
};

export const AdminLogin = createAsyncThunk(
  "Auth/Admin-Login",
  async (
    { data, navigate, rememberMe, onSuccess },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/admin/login`,
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

const adminLoginSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AdminLogin.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(AdminLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
    });
    builder.addCase(AdminLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export default adminLoginSlice?.reducer;
