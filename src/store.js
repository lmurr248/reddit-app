import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./components/Feed/feedSlice";

const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});

export default store;
