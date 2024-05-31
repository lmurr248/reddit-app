import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, selectSearchTerm } from "../../store/searchSlice";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);

  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Reddit..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
