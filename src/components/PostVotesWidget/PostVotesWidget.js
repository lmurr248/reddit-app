import "./PostVotesWidget.css";
import { TiArrowUpOutline, TiArrowDownOutline } from "react-icons/ti";

export default function PostVotesWidget({ post }) {
  return (
    <div className="post-votes-widget">
      <TiArrowUpOutline />
      <p className="red weight-600">{post.ups - post.downs}</p>
      <TiArrowDownOutline />
    </div>
  );
}
