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
  subredditsStatus: "idle",
  comments: [],
  commentsStatus: "idle",
  commentsLoadingByPost: {}, // Track loading state for individual posts
  currentPage: 1,
  postsPerPage: 10,
};

export const fetchPosts = createAsyncThunk(
  "reddit/fetchPosts",
  async ({ subreddit, page, postsPerPage }, { getState }) => {
    const response = await fetchRedditPosts(subreddit, page, postsPerPage);
    const state = getState();
    const currentPage = state.reddit.currentPage;
    return { response, currentPage };
  }
);

export const fetchComments = createAsyncThunk(
  "reddit/fetchComments",
  async ({ subreddit, id }) => {
    const response = await getPostComments({ subreddit, id });
    return { postId: id, comments: response };
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
        state.posts = action.payload.response;
        state.currentPage = action.payload.currentPage + 1;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchComments.pending, (state, action) => {
        const { id } = action.meta.arg;
        state.commentsLoadingByPost[id] = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.commentsStatus = "succeeded";
        state.comments = comments;
        state.commentsLoadingByPost[postId] = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const { id } = action.meta.arg;
        state.commentsStatus = "failed";
        state.commentsLoadingByPost[id] = false;
        state.error = action.error.message;
      })
      .addCase(fetchSubreddits.pending, (state) => {
        state.subredditsStatus = "loading";
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.subredditsStatus = "succeeded";
        state.subreddits = action.payload;
      })
      .addCase(fetchSubreddits.rejected, (state, action) => {
        state.subredditsStatus = "failed";
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
export const selectSubredditsStatus = (state) => state.reddit.subredditsStatus;
export const selectCommentsLoadingByPost = (state) =>
  state.reddit.commentsLoadingByPost;
