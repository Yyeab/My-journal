import "./JournalList.css";
import JournalCard from "./JournalCard";

function JournalList({ journals, onDelete, onEdit }) {
  return (
    <div className="homepage-journal-list">
      {journals.map((journal) => (
        <JournalCard
          key={journal.id}
          journal={journal}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default JournalList;
