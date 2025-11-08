import { useState } from "react";
import axios from "axios";
import "./SearchBar.css"
import { FaSearch } from "react-icons/fa"
function SearchBar({ setResults, setSearchStatus }) {
  const [input, setInput] = useState("");

  const handleSearch = async () => {
    if (!input.trim()) {
      setResults(null); // Reset to default product table
      setSearchStatus(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/searchProduct?keyword=${input}`);
      const data = response.data;

      if (data.length > 0) {
        setResults(data);
        setSearchStatus("found");
      } else {
        setResults([]);
        setSearchStatus("not_found");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
      setSearchStatus("not_found");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Search by product name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}><FaSearch id="search-icon"/></button>
    </div>
  );
}

export default SearchBar;
