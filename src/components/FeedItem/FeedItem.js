import React from "react";
import PostVotesWidget from "../PostVotesWidget/PostVotesWidget";
import "./FeedItem.css";

export default function FeedItem({ post }) {
  // Regular expression to check if the URL ends with an image file extension
  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
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
            <img src={post.url} alt={post.title} />
          ) : null}
          <p className="left">{truncatedText(post.selftext, 200)}</p>
        </div>
      </div>
    </div>
  );
}
