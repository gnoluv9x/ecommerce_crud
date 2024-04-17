import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

//initialState
const initialState = {
  data: {
    users: [],
    user: {},
  },
  error: null,
  loading: false,
};

//actions
export const User_list = createAsyncThunk("User_list", async thunkApi => {
  try {
    const { data } = await userApi.list();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const User_remove = createAsyncThunk("User_remove", async (user, thunkApi) => {
  try {
    const { data } = await userApi.remove(user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const User_read = createAsyncThunk("User_read", async (id, thunkApi) => {
  try {
    const { data } = await userApi.read(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const User_update = createAsyncThunk("User_update", async (user, thunkApi) => {
  try {
    const { data } = await userApi.update(user._id, user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

//create Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //list
    builder.addCase(User_list.pending, state => {
      state.loading = true;
    });
    builder.addCase(User_list.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(User_list.fulfilled, (state, action) => {
      state.loading = false;
      state.data.users = action.payload;
    });

    //read
    builder.addCase(User_read.pending, state => {
      state.loading = true;
    });
    builder.addCase(User_read.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(User_read.fulfilled, (state, action) => {
      state.loading = false;
      state.data.user = action.payload;
    });

    //remove
    builder.addCase(User_remove.pending, state => {
      state.loading = true;
    });
    builder.addCase(User_remove.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(User_remove.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.data.users.findIndex(item => item._id === action.payload.data._id);
      state.data.users.splice(index, 1);
    });

    //update
    builder.addCase(User_update.pending, state => {
      state.loading = true;
    });
    builder.addCase(User_update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(User_update.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const index = state.data.users.findIndex(item => {
        return item._id === action.payload._id;
      });
      state.data.users[index] = {
        ...state.data.users[index],
        ...action.payload,
      };
    });
  },
});

export default userSlice.reducer;
