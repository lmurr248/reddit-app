import React from "react";
import { useSelector } from "react-redux";
import FeedItem from "../FeedItem/FeedItem";;

export default function Feed() {
  const feedItems = useSelector((state) => state.feed.items);

  return (
    <div className="feed">
      <FeedItem feedItems={feedItems} />
    </div>
  );
}
