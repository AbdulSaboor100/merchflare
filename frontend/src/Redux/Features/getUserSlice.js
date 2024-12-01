import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Config";
import axios from "axios";
import { toastError, toastSuccess } from "../../utils/toast";
import { axiosErrorHandler, removeCookie, setCookie } from "../../utils/helper";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  isLoading: false,
  isError: null,
  errors: [],
  isSuccess: false,
  message: "",
  data: {},
};

export const getUser = createAsyncThunk(
  "User/Get-User",
  async (token, { rejectWithValue }) => {
    try {
      setAuthToken(token);
      const response = await axios.get(`${BASE_URL}/api/user`);
      return response?.data;
    } catch (error) {
      axiosErrorHandler(error);
      // return rejectWithValue(error?.response?.data);
    }
  }
);

const getUserSlice = createSlice({
  name: "Get Admin",
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      removeCookie("token");
      state.admin = {};
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.errors = [];
      state.isSuccess = action?.payload?.success;
      state.message = action?.payload?.message;
      state.data = action?.payload?.data;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.errors || [];
      state.products = [];
      state.isError = true;
    });
  },
});

export const { logout } = getUserSlice?.actions;

export default getUserSlice?.reducer;
