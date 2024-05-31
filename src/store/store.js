import { combineReducers, configureStore } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import searchReducer from "./searchSlice";

const rootReducer = combineReducers({
  reddit: redditReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
