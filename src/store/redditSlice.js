import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRedditPosts,
  getPostComments,
  getSubreddits,
} from "../api/reddit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
  subreddits: [],
  comments: [],
  commentsStatus: "idle",
  currentPage: 1,
  postsPerPage: 10,
};

export const fetchPosts = createAsyncThunk(
  "reddit/fetchPosts",
  async ({ subreddit, page, postsPerPage }) => {
    const response = await fetchRedditPosts(subreddit, page, postsPerPage);
    return response;
  }
);

export const fetchComments = createAsyncThunk(
  "reddit/fetchComments",
  async ({ subreddit, id }) => {
    const response = await getPostComments({ subreddit, id });
    return response;
  }
);

export const fetchSubreddits = createAsyncThunk(
  "reddit/fetchSubreddits",
  async () => {
    const response = await getSubreddits();
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
        state.currentPage++;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state) => {
        state.commentsStatus = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.commentsStatus = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.commentsStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSubreddits.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
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
export const selectSubreddits = (state) => state.reddit.subreddits;
export const selectCurrentPage = (state) => state.reddit.currentPage;
export const selectPostsPerPage = (state) => state.reddit.postsPerPage;
