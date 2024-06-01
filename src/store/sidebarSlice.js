import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSubreddit: "popular",
  currentSort: "hot",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCurrentSubreddit: (state, action) => {
      state.currentSubreddit = action.payload;
    },
    setCurrentSort: (state, action) => {
      state.currentSort = action.payload;
    },
  },
});

export const { setCurrentSubreddit, setCurrentSort } = sidebarSlice.actions;
export const {
  selectCurrentSubreddit,
  selectCurrentSort,
} = (state) => state.sidebar;
export default sidebarSlice.reducer;
