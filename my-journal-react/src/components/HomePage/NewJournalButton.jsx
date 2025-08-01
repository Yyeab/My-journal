import "./NewJournalButton.css";

function NewJournalButton({ onClick }) {
  return (
    <button className="homepage-new-journal" onClick={onClick}>
      <span role="img" aria-label="plus" style={{ marginRight: "0.3em" }}>
        <img src="/add.svg" alt="new" />
      </span>{" "}
      New Journal
    </button>
  );
}

export default NewJournalButton;
