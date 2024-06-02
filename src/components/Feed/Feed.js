import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FeedItem from "../FeedItem/FeedItem";
import {
  fetchPosts,
  selectPosts,
  selectStatus,
  selectCurrentPage,
} from "../../store/redditSlice";
import { selectSearchTerm } from "../../store/searchSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Sidebar from "../Sidebar/Sidebar";

export default function Feed() {
  const searchTerm = useSelector(selectSearchTerm) || "photoshopbattles";
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const currentPage = useSelector(selectCurrentPage);


  const [openCommentSection, setOpenCommentSection] = useState(null);

  const loadingPosts = () => {
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
    dispatch(fetchPosts({ subreddit: searchTerm, page: 1, postsPerPage: 10 }));
  }, [dispatch, searchTerm]);

  const handleLoadMore = () => {
    dispatch(
      fetchPosts({
        subreddit: searchTerm,
        page: currentPage + 1,
        postsPerPage: 10,
      })
    );
  };

  return (
    <div className="Feed-container">
      <p className="left search-text">
        Showing results for{" "}
        <span className="red weight-600">"{searchTerm || <Skeleton />}"</span>
      </p>
      <div className="Feed-body">
        <div>
          {loadingPosts()}
          {posts.map((post) => (
            <FeedItem
              key={post.id}
              post={post}
              openCommentSection={openCommentSection}
              setOpenCommentSection={setOpenCommentSection}
            />
          ))}
          {status === "succeeded" && (
            <div className="load-more-container">
              <button className="load-more" onClick={handleLoadMore}>
                Load More Posts
              </button>
            </div>
          )}
        </div>

        <div className="sidebar">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
