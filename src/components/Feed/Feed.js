import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem/FeedItem";
import { fetchPosts, selectPosts } from "../../store/redditSlice";
import { selectSearchTerm } from "../../store/searchSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import he from "he";

export default function Feed() {
  const searchTerm = useSelector(selectSearchTerm) || "photoshopbattles";
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  const loadingPosts = () => {
    if (!posts.length) {
      // Check if posts is empty
      return (
        <Skeleton
          count={5}
          height="200px"
          className="mg-bottom"
          baseColor="#f2f2f2"
          highlightColor="#e6e7e8"
        />
      );
    }
  };

  useEffect(() => {
    async function fetchAndDecodePosts() {
      try {
        await dispatch(fetchPosts(searchTerm)); // Ensure fetchPosts returns a promise
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchAndDecodePosts();
  }, [dispatch, searchTerm]);

  return (
    <div>
      <p className="left mg-bottom">
        Showing results for{" "}
        <span className="red weight-600">"{searchTerm || <Skeleton />}"</span>
      </p>
      {posts.map((post) => (
        <FeedItem
          key={post.id}
          post={{
            ...post,
            title: he.decode(post.title),
            selftext: he.decode(post.selftext),
          }}
        />
      ))}
      {loadingPosts()}
    </div>
  );
}
