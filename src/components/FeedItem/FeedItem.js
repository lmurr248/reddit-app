import PostVotesWidget from "../PostVotesWidget/PostVotesWidget";
import "./FeedItem.css";

export default function FeedItem({ feedItems }) {
  return (
    <div className="feed-container">
      {feedItems.map((item) => {
        return (
          <div className="card feed-card mg-bottom feed-item">
            <PostVotesWidget />
            <div key={item.id} className="feed-details">
              <h3>{item.title}</h3>
              <img src={item.thumbnail} alt={item.title} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
