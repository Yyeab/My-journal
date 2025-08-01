import React from "react";
import Tag from "./Tag";
import "./JournalViewModal.css";

function JournalViewModal({ journal, onClose }) {
  if (!journal) return null;
  const dateStr = journal.created_at
    ? new Date(journal.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
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
          {dateStr}
        </div>
        <div className="journal-modal-tags">
          <span className="journal-modal-tags-label">Tags</span>
          {journal.tags && journal.tags.length > 0 ? (
            journal.tags.map((tag, idx) => (
              <Tag key={tag.id || tag.tag_name || idx} label={tag.tag_name} />
            ))
          ) : (
            <span style={{ color: "#aaa", fontSize: "0.95em" }}>No tags</span>
          )}
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
