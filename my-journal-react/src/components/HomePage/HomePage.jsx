import "./HomePage.css";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import NewJournalButton from "./NewJournalButton";
import JournalList from "./JournalList";
import EditJournal from "../EditJournal/EditJournal.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage({ user, onAddJournal, onLogout, onEdit }) {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJournalId, setEditingJournalId] = useState(null);

  async function fetchJournals() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/journals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJournals(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Failed to fetch journals");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchJournals();
  }, []);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");

  async function handleDeleteJournal() {
    await fetchJournals();
  }

  async function handleEditComplete() {
    setEditingJournalId(null);
    await fetchJournals();
  }

  function handleEditJournal(journalId) {
    setEditingJournalId(journalId);
  }

  const filteredJournals = journals.filter((j) =>
    (j.title || "").toLowerCase().includes(search.toLowerCase())
  );

  const sortedJournals = [...filteredJournals].sort((a, b) => {
    if (sort === "Newest First") {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (dateB - dateA !== 0) {
        return dateB - dateA;
      } else {
        return (b.id || 0) - (a.id || 0);
      }
    } else if (sort === "Oldest First") {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (dateA - dateB !== 0) {
        return dateA - dateB;
      } else {
        return (a.id || 0) - (b.id || 0);
      }
    } else if (sort === "Title A-Z") {
      return (a.title || "").localeCompare(b.title || "");
    } else if (sort === "Title Z-A") {
      return (b.title || "").localeCompare(a.title || "");
    }
    return 0;
  });

  if (editingJournalId) {
    return (
      <EditJournal journalId={editingJournalId} onBack={handleEditComplete} />
    );
  }

  return (
    <div className="homepage-bg">
      <Header onLogout={onLogout} />
      <main className="homepage-main">
        <h1 className="homepage-title">
          Welcome to your journal{" "}
          <span style={{ color: "#357a38" }}>{user?.username || "Guest"}</span>.
        </h1>
        <p className="homepage-subtitle">
          You have {sortedJournals.length} entries
        </p>
        <div className="homepage-controls">
          <SearchBar value={search} onChange={setSearch} />
          <div className="homepage-controls-right">
            <SortDropdown value={sort} onChange={setSort} />
            <NewJournalButton onClick={onAddJournal} />
          </div>
        </div>
        {loading ? (
          <p className="homepage-subtitle">Loading journals...</p>
        ) : error ? (
          <p className="homepage-subtitle" style={{ color: "red" }}>
            {error}
          </p>
        ) : sortedJournals.length === 0 ? (
          <p className="homepage-subtitle">You don't have any journals yet.</p>
        ) : (
          <JournalList
            journals={sortedJournals}
            onDelete={handleDeleteJournal}
            onEdit={handleEditJournal}
          />
        )}
      </main>
    </div>
  );
}

export default HomePage;
