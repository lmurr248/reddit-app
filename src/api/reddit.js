import { fetchWithCache } from "./cache";

export const apiRoot = "https://www.reddit.com";

export const fetchRedditPosts = async (subreddit, page, postsPerPage) => {
  const response = await fetch(
    `${apiRoot}/r/${subreddit}.json?limit=${postsPerPage}&page=${page}`
  );
  const json = await response.json();
  return json.data.children.map((child) => child.data);
};

export const getSubreddits = async () => {
  const url = `${apiRoot}/subreddits.json`;
  const json = await fetchWithCache(url);
  return json.data.children.map((child) => child.data);
};

export const getPostComments = async ({ subreddit, id }) => {
  const url = `${apiRoot}/r/${subreddit}/comments/${id}.json`;
  const json = await fetchWithCache(url);
  return json[1].data.children.map((child) => child.data);
};
