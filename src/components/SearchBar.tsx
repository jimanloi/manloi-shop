import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="search-container">
      <input
        style={{ width: "95%" }}
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mr-3"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" style={{ cursor: "pointer", marginRight: 5 }}>
        {" "}
        🔍
      </button>
    </div>
  );
};

export default SearchBar;
