import { useState } from "react";
import "./AddNewJournal.css";
import Header from "../HomePage/Header";

function AddNewJournal({ onBack }) {
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [story, setStory] = useState("");
  const [error, setError] = useState("");

  function handleAddTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !story.trim()) {
      setError("Title and Your Story are required.");
      return;
    }
    setError("");
    alert("Journal entry saved!");
    if (onBack) onBack();
  }

  return (
    <>
      <Header />
      <div className="add-journal-bg">
        <button className="add-journal-back" onClick={onBack}>
          &larr; Back to Dashboard
        </button>
        <div className="add-journal-header">
          <h1 className="add-journal-title">Create a Journal</h1>
          <p className="add-journal-subtitle">
            Share your story, mood, and reflections
          </p>
        </div>
        <form className="add-journal-form" onSubmit={handleSubmit}>
          <label className="add-journal-label">Title</label>
          <input
            className="add-journal-input"
            type="text"
            placeholder="What's on your mind today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="add-journal-label">Tags (Optional)</label>
          <div className="add-journal-tags-row">
            <input
              className="add-journal-input"
              type="text"
              placeholder="Add a tag (e.g., Happy, Reflective, Excited)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
            />
            <button
              type="button"
              className="add-journal-tag-add"
              onClick={handleAddTag}
            >
              +
            </button>
          </div>
          <div className="add-journal-tags-list">
            {tags.map((tag, idx) => (
              <span key={idx} className="add-journal-tag">
                {tag}
              </span>
            ))}
          </div>
          <label className="add-journal-label">Your Story</label>
          <textarea
            className="add-journal-textarea"
            placeholder="Write your thoughts, experiences, and reflections here..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
          <div className="add-journal-char-count">
            {story.length} characters
          </div>
          {error && <div className="add-journal-error">{error}</div>}
          <div className="add-journal-actions">
            <button type="submit" className="add-journal-save">
              Save Entry
            </button>
            <button
              type="button"
              className="add-journal-cancel"
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

export default AddNewJournal;
