import "./SearchBar.css";

function SearchBar({ value, onChange }) {
  return (
    <div className="homepage-searchbar">
      <span>
        <img src="/search.svg" alt="search" className="homepage-search-icon" />
      </span>
      <input
        className="homepage-search-input"
        type="text"
        placeholder="Search your journal entries..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
