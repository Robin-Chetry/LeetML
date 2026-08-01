import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import problemReducer from "./problemSlice";
import dashboardReducer from "./dashboardSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    problem: problemReducer,
    dashboard: dashboardReducer,
  },
});

export default store;