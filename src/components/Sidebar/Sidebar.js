import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSubreddits } from "../../store/redditSlice";
import "./Sidebar.css";
import Favicon from "./Favicon.svg";
import { setSearchTerm } from "../../store/searchSlice";

export default function Sidebar() {
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();
  const [selectedSubreddit, setSelectedSubreddit] = useState("");

  const handleClick = (e) => {
    const subredditTitle = e.currentTarget.getAttribute("data-value");
    setSelectedSubreddit(subredditTitle);
    dispatch(setSearchTerm(subredditTitle));
  };

  return (
    <div>
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit) => (
          <li
            onClick={handleClick}
            key={subreddit.id}
            className={
              selectedSubreddit == subreddit.display_name
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
