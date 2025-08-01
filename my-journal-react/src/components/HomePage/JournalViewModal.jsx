import React from "react";
import Tag from "./Tag";
import "./JournalViewModal.css";

function JournalViewModal({ journal, onClose }) {
  if (!journal) return null;
  return (
    <div className="journal-modal-overlay" onClick={onClose}>
      <div className="journal-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="journal-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="journal-modal-title">{journal.title}</h2>
        <div className="journal-modal-date">
          <span>
            <img src="/date.svg" alt="date" />
          </span>
          {journal.date}
        </div>
        <div className="journal-modal-tags">
          <span className="journal-modal-tags-label">Tags</span>
          {journal.tags.map((tag, idx) => (
            <Tag key={idx} label={tag} />
          ))}
        </div>
        <div className="journal-modal-content-label">Content</div>
        <div className="journal-modal-content">
          {journal.fullContent || journal.content}
        </div>
      </div>
    </div>
  );
}

export default JournalViewModal;
