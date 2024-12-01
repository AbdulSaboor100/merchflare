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

export const userSignUp = createAsyncThunk(
  "Auth/User-SignUp",
  async ({ data, navigate, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const response1 = await axios.post(
        `${BASE_URL}/api/auth/user/signup`,
        data
      );
      const response2 = await axios.post(`${BASE_URL}/api/auth/user/verify`, {
        email: response1?.data?.email,
      });
      onSuccess && onSuccess();
      // toastSuccess(response1?.data?.message);
      toastSuccess(response2?.data?.message);
      return response1?.data;
    } catch (error) {
      axiosErrorHandler(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSignUpSlice = createSlice({
  name: "Login",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignUp.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(userSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
    });
    builder.addCase(userSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export default userSignUpSlice?.reducer;
