import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserSubmissions } from "../api/problemApi";

export const fetchUserSubmissions = createAsyncThunk(
  "submission/fetchUserSubmissions",
  async (params, thunkAPI) => {
    try {
      return await getUserSubmissions(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch submissions"
      );
    }
  }
);

const submissionSlice = createSlice({
  name: "submission",

  initialState: {
    submissions: [],
    currentPage: 1,
    totalPages: 1,
    totalSubmissions: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.submissions) {
          state.submissions = action.payload.submissions;
          state.currentPage = action.payload.currentPage || 1;
          state.totalPages = action.payload.totalPages || 1;
          state.totalSubmissions = action.payload.totalSubmissions || 0;
        } else {
          state.submissions = action.payload;
        }
      })

      .addCase(fetchUserSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default submissionSlice.reducer;