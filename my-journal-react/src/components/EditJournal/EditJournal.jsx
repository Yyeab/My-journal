import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditJournal.css";
import Header from "../HomePage/Header";

function EditJournal({ journalId, onBack }) {
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [story, setStory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    async function fetchJournal() {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/journals/${journalId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTitle(response.data.title);
        setStory(response.data.content);
        setTags(
          response.data.tags
            ? response.data.tags.map((tag) => tag.tag_name)
            : []
        );
        setUpdatedAt(response.data.updated_at);
      } catch (err) {
        setError("Failed to load journal");
      } finally {
        setLoading(false);
      }
    }
    fetchJournal();
  }, [journalId]);

  async function saveJournal(fields) {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:3000/journals/${journalId}`,
        { journal: fields },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setError("");
      if (response.data && response.data.updated_at) {
        setUpdatedAt(response.data.updated_at);
      } else {
        setUpdatedAt(new Date().toISOString());
      }
      onBack();
    } catch (err) {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  function handleAddTag() {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      setTags(newTags);
      setTagInput("");
    }
  }

  function handleRemoveTag(tagToRemove) {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
  }

  function handleManualSave() {
    saveJournal({ title, content: story, tags });
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="edit-journal-bg">
          <p className="edit-journal-subtitle">Loading journal...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="edit-journal-bg">
        <button className="edit-journal-back" onClick={onBack}>
          &larr; Back to Dashboard
        </button>
        <div className="edit-journal-header">
          <h1 className="edit-journal-title">Edit Journal Entry</h1>
          <p className="edit-journal-subtitle">
            Update your thoughts and memories
          </p>
        </div>
        <form
          className="edit-journal-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="edit-journal-label">Title</label>
          <input
            className="edit-journal-input"
            id="edit-journal-title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="edit-journal-label">Moods (Optional)</label>
          <div className="edit-journal-tags-row">
            <input
              className="edit-journal-input"
              type="text"
              placeholder="Add a mood (e.g., Happy, Reflective, Excited)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <button
              type="button"
              className="edit-journal-tag-add"
              onClick={handleAddTag}
            >
              +
            </button>
          </div>
          <div className="edit-journal-tags-list">
            {tags.map((tag, idx) => (
              <span key={idx} className="edit-journal-tag">
                {tag}
                <button
                  type="button"
                  className="edit-journal-tag-remove"
                  onClick={() => handleRemoveTag(tag)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <label className="edit-journal-label">Your Story</label>
          <textarea
            className="edit-journal-textarea"
            placeholder="Write your thoughts, experiences, and reflections here..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
          <div className="edit-journal-char-count">
            {story.length} characters
          </div>
          {error && <div className="edit-journal-error">{error}</div>}
          <div className="edit-journal-actions">
            <button
              type="button"
              className="edit-journal-save"
              onClick={handleManualSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="edit-journal-cancel"
              onClick={onBack}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditJournal;
