import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSubreddits,
  fetchPosts,
  selectSubredditsStatus,
} from "../../store/redditSlice";
import "./Sidebar.css";
import Favicon from "./Favicon.svg";
import { setSearchTerm } from "../../store/searchSlice";
import Skeleton from "react-loading-skeleton";

export default function Sidebar() {
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();
  const [selectedSubreddit, setSelectedSubreddit] = useState("");
  const subredditsStatus = useSelector(selectSubredditsStatus);

  const handleClick = (e) => {
    const subredditTitle = e.currentTarget.getAttribute("data-value");
    setSelectedSubreddit(subredditTitle);
    dispatch(setSearchTerm(subredditTitle));
    dispatch(
      fetchPosts({ subreddit: subredditTitle, page: 1, postsPerPage: 10 })
    );
  };

  const loadingSubreddits = () => {
    if (subredditsStatus === "loading") {
      return (
        <Skeleton
          count={5}
          height="50px"
          className="mg-bottom"
          baseColor="#f2f2f2"
          highlightColor="#e6e7e8"
        />
      );
    }
  };

  return (
    <div>
      <h2>Subreddits</h2>
      <ul>
        {loadingSubreddits()}
        {subredditsStatus === "succeeded" &&
          subreddits.map((subreddit) => (
            <li
              onClick={handleClick}
              key={subreddit.id}
              className={
                selectedSubreddit === subreddit.display_name
                  ? "subreddits active"
                  : "subreddits"
              }
              data-value={subreddit.display_name}
            >
              <img
                className="subreddit-icon"
                src={subreddit.icon_img ? subreddit.icon_img : Favicon}
                alt={subreddit.display_name}
              />
              <p>{subreddit.display_name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
