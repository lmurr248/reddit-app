import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1>Reddit App</h1>
        <SearchBar />
      </div>
    </header>
  );
}
