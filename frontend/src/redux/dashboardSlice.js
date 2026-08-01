import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../api/dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, thunkAPI) => {
    try {
      return await getDashboardStats();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to fetch dashboard stats."
      );
    }
  }
);

const initialState = {
  totalProblems: 0,
  solvedProblems: 0,
  currentStreak: 0,
  accuracy: 0,

  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        state.totalProblems = action.payload.totalProblems;
        state.solvedProblems = action.payload.solvedProblems;
        state.currentStreak = action.payload.currentStreak;
        state.accuracy = action.payload.accuracy;
      })

      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;