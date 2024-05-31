// src/store/redditSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRedditPosts, getPostComments } from "../api/reddit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "reddit/fetchPosts",
  async (subreddit) => {
    const response = await fetchRedditPosts(subreddit);
    return response;
  }
);

export const fetchComments = createAsyncThunk(
  "reddit/fetchComments",
  async (permalink) => {
    const response = await getPostComments(permalink);
    return response;
  }
);

const redditSlice = createSlice({
  name: "reddit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const redditReducer = redditSlice.reducer;

export default redditSlice.reducer;

// Export selectors for useSelector()
export const selectPosts = (state) => state.reddit.posts;
export const selectStatus = (state) => state.reddit.status;
export const selectError = (state) => state.reddit.error;
export const selectPostComments = (state) => state.reddit.comments;
export const selectCommentsStatus = (state) => state.reddit.commentsStatus;
