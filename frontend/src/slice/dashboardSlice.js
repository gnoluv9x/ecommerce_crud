import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dashboardApi from "../api/dashboardApi";

//initialState
const initialState = {
  summary: {
    data: null,
    loading: false,
    error: null,
  },
  report: {
    data: null,
    loading: false,
    error: null,
  },
};

//actions
export const Dashboard_summary = createAsyncThunk("Dashboard_summary", async (date, thunkApi) => {
  try {
    const { data } = await dashboardApi.getSummaryDays({ month: date });
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const Dashboard_report = createAsyncThunk("Dashboard_report", async (date, thunkApi) => {
  try {
    const { data } = await dashboardApi.getReportDays({ month: date });
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

//create Slice
const dashboardSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: builder => {
    // summary
    builder.addCase(Dashboard_summary.pending, state => {
      state.summary.loading = true;
    });
    builder.addCase(Dashboard_summary.rejected, (state, action) => {
      state.summary.loading = false;
      state.summary.error = action.error;
    });
    builder.addCase(Dashboard_summary.fulfilled, (state, action) => {
      state.summary.loading = false;
      state.summary.data = action.payload;
    });

    // report
    builder.addCase(Dashboard_report.pending, state => {
      state.report.loading = true;
    });
    builder.addCase(Dashboard_report.rejected, (state, action) => {
      state.report.loading = false;
      state.report.error = action.error;
    });
    builder.addCase(Dashboard_report.fulfilled, (state, action) => {
      state.report.loading = false;
      state.report.data = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
