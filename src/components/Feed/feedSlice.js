import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      title: "This is a Reddit post",
      thumbnail: "https://via.placeholder.com/150",
      ups: 100,
      downs: 10,
      num_comments: 20,
      created: new Date().toISOString(),
      author: "John Doe",
    },
    {
      id: 2,
      title: "This is a Reddit post 2",
      thumbnail: "https://via.placeholder.com/150",
      ups: 200,
      downs: 40,
      num_comments: 10,
      created: new Date().toISOString(),
      author: "Jane Doe",
    },
  ],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addFeedItem(state, action) {
      state.items.push(action.payload);
    },
  },
});

export const { addFeedItem } = feedSlice.actions;
export default feedSlice.reducer;
