import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSubmissionById } from "../api/problemApi";

export const fetchSubmissionById = createAsyncThunk(
  "submissionDetail/fetchSubmissionById",
  async (submissionId, thunkAPI) => {
    try {
      return await getSubmissionById(submissionId);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch submission"
      );
    }
  }
);

const submissionDetailSlice = createSlice({
  name: "submissionDetail",

  initialState: {
    submission: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSubmission(state) {
      state.submission = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSubmissionById.fulfilled, (state, action) => {
        state.loading = false;
        state.submission = action.payload;
      })

      .addCase(fetchSubmissionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubmission } = submissionDetailSlice.actions;

export default submissionDetailSlice.reducer;