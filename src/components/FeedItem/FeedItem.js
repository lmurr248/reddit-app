// FeedItem.js

import React, { useState, useEffect } from "react";
import PostVotesWidget from "../PostVotesWidget/PostVotesWidget";
import "./FeedItem.css";
import { formatDistanceToNow } from "date-fns";
import messageSquare from "./message-square.svg";
import { useSelector, useDispatch } from "react-redux";
import { fetchComments, selectPostComments } from "../../store/redditSlice";
import Skeleton from "react-loading-skeleton";

export default function FeedItem({
  post,
  openCommentSection,
  setOpenCommentSection,
}) {
  const dispatch = useDispatch();
  const postComments = useSelector(selectPostComments);
  const [showComments, setShowComments] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false); // New state for loading comments

  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  const timeAgo = (timeStamp) => {
    if (!timeStamp) return "Invalid date";
    const date = new Date(timeStamp * 1000);
    if (isNaN(date.getTime())) return "Invalid date";
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const truncatedText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const handleCommentIconClick = () => {
    if (openCommentSection === post.id) {
      setOpenCommentSection(null);
    } else {
      setOpenCommentSection(post.id);
      setLoadingComments(true); // Set loading state to true when fetching comments
      dispatch(fetchComments({ subreddit: post.subreddit, id: post.id }))
        .then(() => setLoadingComments(false)) // Set loading state to false when comments are fetched
        .catch(() => setLoadingComments(false)); // Set loading state to false if there's an error fetching comments
    }
  };

  return (
    <div className="feed-container">
      <div className="card feed-card mg-bottom feed-item">
        <PostVotesWidget post={post} />
        <div key={post.id} className="feed-details">
          <h3 className="left">{post.title}</h3>
          {isImageUrl(post.url) ? (
            <img className="icon" src={post.url} alt={post.title} />
          ) : null}
          <p className="left">{truncatedText(post.selftext, 200)}</p>
          <div className="feed-footer">
            <p className="time-ago">
              {timeAgo(post.created)} by{" "}
              <span className="red weight-600">{post.author}</span>
            </p>
            <div className="comments-icon" onClick={handleCommentIconClick}>
              <p>{post.num_comments}</p>
              <img
                className="comment-icon"
                src={messageSquare}
                alt="comment icon"
              />
            </div>
          </div>
          {openCommentSection === post.id && (
            <div className="comments-section">
              {loadingComments ? (
                // Render skeleton loading while comments are being fetched
                <Skeleton count={5} height={50} />
              ) : postComments.length > 0 ? (
                postComments.map((comment) => (
                  <div key={comment.id} className="comment mg-bottom">
                    <p>
                      <span className="red weight-600">{comment.author}</span>{" "}
                      {timeAgo(comment.created_utc)}:
                    </p>
                    <p className="comment-body">{comment.body}</p>
                  </div>
                ))
              ) : (
                <p>No comments available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
