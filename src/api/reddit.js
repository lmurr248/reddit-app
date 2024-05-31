export const apiRoot = "https://www.reddit.com";

export const fetchRedditPosts = async (subreddit) => {
  const response = await fetch(`${apiRoot}/r/${subreddit}.json`);
  const json = await response.json();
  return json.data.children.map((child) => child.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`${apiRoot}/subreddits.json`);
  const json = await response.json();
  return json.data.children.map((child) => child.data);
};

export const getPostComments = async (permalink) => {
  const response = await fetch(`${apiRoot}${permalink}.json`);
  const json = await response.json();
  return json[1].data.children.map((child) => child.data);
};
