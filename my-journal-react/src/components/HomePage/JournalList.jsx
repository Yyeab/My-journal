import "./JournalList.css";
import JournalCard from "./JournalCard";

function JournalList({ journals }) {
  return (
    <div className="homepage-journal-list">
      {journals.map((journal) => (
        <JournalCard key={journal.id} journal={journal} />
      ))}
    </div>
  );
}

export default JournalList;
