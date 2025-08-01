import React, { useState } from "react";
import "./JournalCard.css";
import Tag from "./Tag";
import JournalViewModal from "./JournalViewModal";

function JournalCard({ journal }) {
  const [showModal, setShowModal] = useState(false);
  const preview =
    journal.content.length > 100
      ? journal.content.slice(0, 100) + "..."
      : journal.content;

  function handleDownload(e) {
    e.stopPropagation();
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(journal.title, 10, 20);
      doc.setFontSize(12);
      doc.text(`Date: ${journal.date}`, 10, 30);
      doc.text(`Tags: ${journal.tags.join(", ")}`, 10, 40);
      const contentLines = doc.splitTextToSize(journal.content, 180);
      doc.text(contentLines, 10, 50);
      doc.save(`${journal.title.replace(/[^a-z0-9]/gi, "_")}.pdf`);
    });
  }

  return (
    <>
      <div
        className="homepage-journal-card"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="homepage-journal-title-row">
          <span className="homepage-journal-title">{journal.title}</span>
          <span className="homepage-journal-icons">
            <button aria-label="Edit" onClick={(e) => e.stopPropagation()}>
              <img src="/edit.svg" alt="edit" />
            </button>
            <button aria-label="Download" onClick={handleDownload}>
              <img src="/download.svg" alt="download" />
            </button>
            <button aria-label="Delete" onClick={(e) => e.stopPropagation()}>
              <img src="/delete.svg" alt="delete" />
            </button>
          </span>
        </div>
        <div className="homepage-journal-date">
          <span>
            <img src="/date.svg" alt="date" />
          </span>
          {journal.date}
        </div>
        <div className="homepage-journal-content">{preview}</div>
        <div className="homepage-journal-tags">
          {journal.tags.map((tag, idx) => (
            <Tag key={idx} label={tag} />
          ))}
        </div>
      </div>
      {showModal && (
        <JournalViewModal
          journal={{ ...journal, fullContent: journal.content }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default JournalCard;
