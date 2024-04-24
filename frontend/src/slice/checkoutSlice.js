import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import checkoutApi from "../api/checkout";

//initialState
const initialState = {
  data: {
    status: "",
  },
  error: null,
  loading: false,
};

//actions
export const Checkout_create = createAsyncThunk(
  "Checkout_create",
  async (checkoutData, thunkApi) => {
    try {
      const { data } = await checkoutApi.create(checkoutData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

//create Slice
const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //create
    builder.addCase(Checkout_create.pending, state => {
      state.loading = true;
    });
    builder.addCase(Checkout_create.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Checkout_create.fulfilled, (state, action) => {
      state.loading = false;
      state.data.status = "success";
    });
  },
});

export default checkoutSlice.reducer;
