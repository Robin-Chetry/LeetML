import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import problemReducer from "./problemSlice";
import dashboardReducer from "./dashboardSlice";
import userProfileReducer from "./userProfileSlice";
import submissionReducer from "./submissionSlice";
import submissionDetailReducer from "./submissionDetailSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    problem: problemReducer,
    dashboard: dashboardReducer,
    profile: userProfileReducer,
    submission: submissionReducer,
    submissionDetail: submissionDetailReducer,
  },
});

export default store;