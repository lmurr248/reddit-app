import { combineReducers, configureStore } from "@reduxjs/toolkit";
import redditReducer from "./redditSlice";
import searchReducer from "./searchSlice";
import sidebarReducer from "./sidebarSlice";

const rootReducer = combineReducers({
  reddit: redditReducer,
  search: searchReducer,
  sidebar: sidebarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
