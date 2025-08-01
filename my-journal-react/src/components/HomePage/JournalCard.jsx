import React, { useState } from "react";
import axios from "axios";
import "./JournalCard.css";
import Tag from "./Tag";
import JournalViewModal from "./JournalViewModal";

function JournalCard({ journal, onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const preview =
    journal.content && journal.content.length > 100
      ? journal.content.slice(0, 100) + "..."
      : journal.content;

  function handleDownload(e) {
    e.stopPropagation();
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text(journal.title, 10, 20);
      doc.setFontSize(12);
      const dateStr = journal.created_at
        ? new Date(journal.created_at).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "";
      doc.text(`Date: ${dateStr}`, 10, 30);
      const tagStr =
        journal.tags && journal.tags.length > 0
          ? journal.tags.map((tag) => tag.tag_name).join(", ")
          : "None";
      doc.text(`Tags: ${tagStr}`, 10, 40);
      const contentLines = doc.splitTextToSize(journal.content, 180);
      doc.text(contentLines, 10, 50);
      doc.save(`${journal.title.replace(/[^a-z0-9]/gi, "_")}.pdf`);
    });
  }

  async function handleDelete(e) {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this journal?"))
      return;
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/journals/${journal.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onDelete) onDelete(journal.id);
    } catch (err) {
      alert("Failed to delete journal.");
    } finally {
      setDeleting(false);
    }
  }

  function handleEdit(e) {
    e.stopPropagation();
    if (onEdit) onEdit(journal.id);
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
            <button aria-label="Edit" onClick={handleEdit}>
              <img src="/edit.svg" alt="edit" />
            </button>
            <button aria-label="Download" onClick={handleDownload}>
              <img src="/download.svg" alt="download" />
            </button>
            <button
              aria-label="Delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              <img src="/delete.svg" alt="delete" />
            </button>
          </span>
        </div>
        <div className="homepage-journal-date">
          <span>
            <img src="/date.svg" alt="date" />
          </span>
          {journal.created_at
            ? new Date(journal.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : ""}
        </div>
        <div className="homepage-journal-content">{preview}</div>
        <div className="homepage-journal-tags">
          {journal.tags && journal.tags.length > 0 ? (
            journal.tags.map((tag) => (
              <Tag key={tag.id || tag.tag_name} label={tag.tag_name} />
            ))
          ) : (
            <span style={{ color: "#aaa", fontSize: "0.95em" }}>No tags</span>
          )}
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
