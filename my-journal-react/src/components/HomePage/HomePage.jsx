import "./HomePage.css";
import { useState } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import NewJournalButton from "./NewJournalButton";
import JournalList from "./JournalList";

function HomePage({ onAddJournal }) {
  const journals = [
    {
      id: 1,
      title: "A Beautiful Morning Walk",
      date: "Monday, January 15, 2024",
      content:
        "Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...Today I took a long walk through the park and noticed how the morning light filtered through the leaves. There's something magical about starting the ...",
      tags: ["Peaceful", "Grateful", "nature", "morning", "reflection"],
    },
    {
      id: 2,
      title: "Learning Something New",
      date: "Sunday, January 14, 2024",
      content:
        "Started learning to play guitar today. My fingers hurt and the chords sound terrible, but there's something exciting about being a beginner again. It ...",
      tags: ["Excited", "Challenged", "learning", "music", "growth"],
    },
    {
      id: 3,
      title: "Family Dinner Memories",
      date: "Saturday, January 13, 2024",
      content:
        "Had dinner with the family tonight. We laughed so much that my cheeks hurt. Mom made her famous lasagna, and dad told his classic jokes. These are the ...",
      tags: ["Grateful", "Happy", "Loved", "family", "memories", "gratitude"],
    },
  ];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest First");

  const filteredJournals = journals.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedJournals = [...filteredJournals].sort((a, b) => {
    if (sort === "Newest First") {
      return new Date(b.date) - new Date(a.date);
    } else if (sort === "Oldest First") {
      return new Date(a.date) - new Date(b.date);
    } else if (sort === "Title A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sort === "Title Z-A") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  return (
    <div className="homepage-bg">
      <Header />
      <main className="homepage-main">
        <h1 className="homepage-title">Welcome back to your journal</h1>
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
        <JournalList journals={sortedJournals} />
      </main>
    </div>
  );
}

export default HomePage;
