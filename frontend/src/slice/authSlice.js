import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

//initialState
const initialState = {
  data: {},
  error: null,
  loading: false,
  forgotpassword: {
    loading: false,
    data: null,
    error: "",
  },
};

//actions
export const SignUp = createAsyncThunk("SignUp", async (userData, thunkApi) => {
  try {
    const { data } = await authApi.signup(userData);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const SignIn = createAsyncThunk("SignIn", async (userData, thunkApi) => {
  try {
    const { data } = await authApi.signin(userData);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const ForgotPassword = createAsyncThunk("ForgotPassword", async (email, thunkApi) => {
  try {
    const { data } = await authApi.forgotPassword(email);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

//create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //signup
    builder.addCase(SignUp.pending, state => {
      state.loading = true;
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    //signin
    builder.addCase(SignIn.pending, state => {
      state.loading = true;
    });
    builder.addCase(SignIn.rejected, (state, action) => {
      console.log(action);
      state.error = action.error;
      state.loading = false;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      console.log(action);
      // console.log("state: ", state);
      // console.log("action: ", action);
      state.data = action.payload;
      state.loading = false;
    });

    // forgot password
    builder.addCase(ForgotPassword.pending, state => {
      state.forgotpassword.loading = true;
    });
    builder.addCase(ForgotPassword.rejected, (state, action) => {
      state.forgotpassword.error = action.error;
      state.forgotpassword.loading = false;
    });
    builder.addCase(ForgotPassword.fulfilled, (state, action) => {
      state.forgotpassword.data = action.payload;
      state.forgotpassword.loading = false;
    });
  },
});
export default authSlice.reducer;
