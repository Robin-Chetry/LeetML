import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setLoading,
} = userSlice.actions;

export default userSlice.reducer;