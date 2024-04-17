import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderApi from "../api/orderApi";

//initialState
const initialState = {
  data: {
    orders: [],
    ordersByUser: [],
    order: {},
  },
  error: null,
  loading: false,
};

//actions
export const Order_create = createAsyncThunk("Order_create", async (order, thunkApi) => {
  try {
    const { data } = await orderApi.add(order);
    console.log(data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Order_list = createAsyncThunk("Order_list", async thunkApi => {
  try {
    const { data } = await orderApi.list();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Order_listByUser = createAsyncThunk("Order_listByUser", async (user, thunkApi) => {
  try {
    const { data } = await orderApi.orderByUser(user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Order_remove = createAsyncThunk("Order_remove", async (id, thunkApi) => {
  try {
    const { data } = await orderApi.remove(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const OrderByUser_remove = createAsyncThunk("OrderByUser_remove", async (id, thunkApi) => {
  try {
    const { data } = await orderApi.remove(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Order_update = createAsyncThunk("Order_update", async (order, thunkApi) => {
  try {
    const { data } = await orderApi.update(order._id, order);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Order_read = createAsyncThunk("Order_read", async (id, thunkApi) => {
  try {
    const { data } = await orderApi.read(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

//create Slice
const orderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //create
    builder.addCase(Order_create.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_create.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_create.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orders.push(action.payload);
    });

    //list
    builder.addCase(Order_list.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_list.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_list.fulfilled, (state, action) => {
      state.loading = false;
      state.data.orders = action.payload;
    });

    //listByUser
    builder.addCase(Order_listByUser.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_listByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_listByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data.ordersByUser = action.payload;
    });

    //remove
    builder.addCase(Order_remove.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_remove.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_remove.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      let index = state.data.orders.findIndex(item => item._id === action.payload.data._id);
      state.data.orders.splice(index, 1);
    });

    //remove by User
    builder.addCase(OrderByUser_remove.pending, state => {
      state.loading = true;
    });
    builder.addCase(OrderByUser_remove.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(OrderByUser_remove.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      let index = state.data.ordersByUser.findIndex(item => item._id === action.payload.data._id);
      state.data.ordersByUser.splice(index, 1);
    });

    //update
    builder.addCase(Order_update.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_update.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const index = state.data.orders.findIndex(item => {
        return item._id === action.payload._id;
      });
      state.data.orders[index] = {
        ...state.data.orders[index],
        ...action.payload,
      };
    });

    //read
    builder.addCase(Order_read.pending, state => {
      state.loading = true;
    });
    builder.addCase(Order_read.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Order_read.fulfilled, (state, action) => {
      state.loading = false;
      state.data.order = action.payload;
    });
  },
});

export default orderSlice.reducer;
