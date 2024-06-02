import React from "react";
import PostVotesWidget from "../PostVotesWidget/PostVotesWidget";
import "./FeedItem.css";
import { formatDistanceToNow } from "date-fns";
import messageSquare from "./message-square.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchComments,
  selectPostComments,
  selectCommentsLoadingByPost,
} from "../../store/redditSlice";
import Skeleton from "react-loading-skeleton";

export default function FeedItem({
  post,
  openCommentSection,
  setOpenCommentSection,
}) {
  const dispatch = useDispatch();
  const postComments = useSelector(selectPostComments);
  const commentsLoadingByPost = useSelector(selectCommentsLoadingByPost);

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
      dispatch(fetchComments({ subreddit: post.subreddit, id: post.id }));
    }
  };

  const renderCommentBody = (body) => {
    if (!body) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const formattedBody = body.replace(urlRegex, (url) => {
      if (/\.(jpg|jpeg|png|gif)$/i.test(url)) {
        return `<img src="${url}" alt="comment image" class="comment-image"/>`;
      } else {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
      }
    });

    return <div dangerouslySetInnerHTML={{ __html: formattedBody }} />;
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
            <div
              className="comment-icon-container"
              onClick={handleCommentIconClick}
            >
              <img
                className="comment-icon"
                src={messageSquare}
                alt="comment icon"
              />
              <p>{post.num_comments}</p>
            </div>
          </div>
          {openCommentSection === post.id && (
            <div className="comments-section">
              {commentsLoadingByPost[post.id] ? (
                <Skeleton count={5} height={50} />
              ) : postComments.length > 0 ? (
                postComments.map((comment) => (
                  <div key={comment.id} className="comment mg-bottom">
                    <p>
                      <span className="red weight-600">{comment.author}</span>{" "}
                      {timeAgo(comment.created_utc)}:
                    </p>
                    <div className="comment-body">
                      {renderCommentBody(comment.body)}
                    </div>
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
