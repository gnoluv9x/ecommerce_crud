import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApi from "../api/productApi";

//initialState
const initialState = {
  data: {
    products: [],
    product: null,
    productFilter: [],
  },
  error: null,
  loading: false,
};

//actions
export const Product_create = createAsyncThunk("Product_create", async (product, thunkApi) => {
  try {
    const { data } = await productApi.add(product);
    console.log(data);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Product_list = createAsyncThunk("Product_list", async thunkApi => {
  const { data } = await productApi.list();
  return data;
});
export const Product_remove = createAsyncThunk("Product_remove", async (product, thunkApi) => {
  try {
    const { data } = await productApi.remove(product);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Product_update = createAsyncThunk("Product_update", async (product, thunkApi) => {
  try {
    const { data } = await productApi.update(product._id, product);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const Product_read = createAsyncThunk("Product_read", async (id, thunkApi) => {
  try {
    const { data } = await productApi.read(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

//create Slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    //create
    builder.addCase(Product_create.pending, state => {
      state.loading = true;
    });
    builder.addCase(Product_create.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Product_create.fulfilled, (state, action) => {
      state.loading = false;
      state.data.products.push(action.payload);
    });

    //list
    builder.addCase(Product_list.pending, state => {
      state.loading = true;
    });
    builder.addCase(Product_list.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Product_list.fulfilled, (state, action) => {
      state.loading = false;
      state.data.products = action.payload;
    });

    //remove
    builder.addCase(Product_remove.pending, state => {
      state.loading = true;
    });
    builder.addCase(Product_remove.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Product_remove.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action);
      let index = state.data.products.findIndex(item => item._id === action.payload.data._id);
      state.data.products.splice(index, 1);
    });

    //update
    builder.addCase(Product_update.pending, state => {
      state.loading = true;
    });
    builder.addCase(Product_update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Product_update.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      const index = state.data.products.findIndex(item => {
        return item._id === action.payload._id;
      });
      state.data.products[index] = {
        ...state.data.products[index],
        ...action.payload,
      };
    });

    //read
    builder.addCase(Product_read.pending, state => {
      state.loading = true;
    });
    builder.addCase(Product_read.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(Product_read.fulfilled, (state, action) => {
      state.loading = false;
      state.data.product = action.payload;
    });
  },
});

export default productSlice.reducer;
