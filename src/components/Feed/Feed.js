import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem/FeedItem";
import { fetchPosts, selectPosts, selectStatus } from "../../store/redditSlice";
import { selectSearchTerm } from "../../store/searchSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Feed() {
  const searchTerm = useSelector(selectSearchTerm) || "photoshopbattles";
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);

  const loadingPosts = () => {
    // If status is loading, display skeleton
    if (status === "loading") {
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
    // Dispatch fetchPosts action
    dispatch(fetchPosts(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <div>
      <p className="left mg-bottom">
        Showing results for{" "}
        <span className="red weight-600">"{searchTerm || <Skeleton />}"</span>
      </p>
      {/* Render loadingPosts function */}
      {loadingPosts()}
      {/* Render posts */}
      {posts.map((post) => (
        <FeedItem key={post.id} post={post} />
      ))}
    </div>
  );
}
