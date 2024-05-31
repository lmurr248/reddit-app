import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";
import RedditFeedLogo from "./RedditFeedLogo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={RedditFeedLogo} alt="Reddit feed logo" className="logo" />
        <SearchBar />
      </div>
      <div></div>
    </header>
  );
}
