import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProblems } from "../api/problemApi";

// Async Thunk to fetch problems with dynamic parameters (page, search, difficulty, topic, sort)
export const fetchProblems = createAsyncThunk(
  "problem/fetchProblems",
  async (params = {}, thunkAPI) => {
    try {
      return await getProblems(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to fetch problems."
      );
    }
  }
);

const initialState = {
  problems: [],
  totalProblems: 0,
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* Pending State: Trigger loading indicator & reset errors */
      .addCase(fetchProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /* Fulfilled State: Populate store with API response payload & clear error */
      .addCase(fetchProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.problems = action.payload.problems;
        state.totalProblems = action.payload.totalProblems;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })

      /* Rejected State: Capture and store error message */
      .addCase(fetchProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default problemSlice.reducer;