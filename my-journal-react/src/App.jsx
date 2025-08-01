import { useState } from "react";
import HomePage from "./components/HomePage/HomePage";
import AddNewJournal from "./components/AddNewJournal/AddNewJournal";
import "./index.css";

function App() {
  const [showAdd, setShowAdd] = useState(false);

  if (showAdd) {
    return <AddNewJournal onBack={() => setShowAdd(false)} />;
  }

  return <HomePage onAddJournal={() => setShowAdd(true)} />;
}

export default App;
