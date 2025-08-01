import "./SortDropdown.css";
import { useState, useRef, useEffect } from "react";

const options = ["Newest First", "Oldest First", "Title A-Z", "Title Z-A"];

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sort-dropdown-wrapper" ref={dropdownRef}>
      <button
        className="sort-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {value}{" "}
        <span className="sort-dropdown-arrow">
          <img src="/arrow.svg" alt="dropdown" />
        </span>
      </button>
      {open && (
        <ul className="sort-dropdown-menu" role="listbox">
          {options.map((option) => (
            <li
              key={option}
              className={
                "sort-dropdown-option" +
                (option === value ? " sort-dropdown-selected" : "")
              }
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              role="option"
              aria-selected={option === value}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
