import React from "react";
import PostVotesWidget from "../PostVotesWidget/PostVotesWidget";
import "./FeedItem.css";
import { formatDistanceToNow } from "date-fns";
import messageSquare from "./message-square.svg";

export default function FeedItem({ post }) {
  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  const timeAgo = (timeStamp) => {
    return formatDistanceToNow(new Date(timeStamp * 1000), { addSuffix: true });
  };

  const truncatedText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
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
            <img
              className="comment-icon"
              src={messageSquare}
              alt="comment icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
