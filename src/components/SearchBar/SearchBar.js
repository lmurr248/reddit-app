import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/searchSlice";
import { fetchPosts } from "../../store/redditSlice";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTermLocal] = useState(""); // Local state for input value

  const handleInputChange = (e) => {
    // Update the local state without dispatching the action
    setSearchTermLocal(e.target.value);
  };

  const handleButtonClick = () => {
    // Dispatch setSearchTerm with the local state value
    dispatch(setSearchTerm(searchTerm));
    dispatch(fetchPosts(searchTerm));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Reddit..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Search</button>
    </div>
  );
}
