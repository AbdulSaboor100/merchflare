import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Config";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { axiosErrorHandler, removeCookie, setCookie } from "../../utils/helper";

const initialState = {
  isLoading: false,
  isError: null,
  errors: [],
  isSuccess: false,
  message: "",
  data: [],
};

export const getMerch = createAsyncThunk(
  "User/Get-Merch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/merch`);
      return response?.data;
    } catch (error) {
      axiosErrorHandler(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const getMerchSlice = createSlice({
  name: "Get Merch",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMerch.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getMerch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
      state.data = action?.payload?.data;
    });
    builder.addCase(getMerch.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export default getMerchSlice?.reducer;
