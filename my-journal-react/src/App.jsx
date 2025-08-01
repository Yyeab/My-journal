import HomePage from "./components/HomePage/HomePage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import AddNewJournal from "./components/AddNewJournal/AddNewJournal";
import EditJournal from "./components/EditJournal/EditJournal";

import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showAddJournal, setShowAddJournal] = useState(false);
  const [editingJournalId, setEditingJournalId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleAuthSuccess = (userObj) => {
    setUser(userObj);
    localStorage.setItem("user", JSON.stringify(userObj));
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowSignUp(false);
    setShowAddJournal(false);
    setEditingJournalId(null);
  };

  const handleShowSignUp = () => setShowSignUp(true);
  const handleShowSignIn = () => setShowSignUp(false);
  const handleAddJournal = () => setShowAddJournal(true);
  const handleBackToDashboard = () => {
    setShowAddJournal(false);
    setEditingJournalId(null);
  };
  const handleEditJournal = (journalId) => setEditingJournalId(journalId);

  if (!user) {
    return showSignUp ? (
      <SignUpForm onSignIn={handleShowSignIn} />
    ) : (
      <SignInForm
        onSignUp={handleShowSignUp}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  if (showAddJournal) {
    return <AddNewJournal onBack={handleBackToDashboard} userId={user.id} />;
  }

  if (editingJournalId) {
    return (
      <EditJournal
        journalId={editingJournalId}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <HomePage
      user={user}
      onAddJournal={handleAddJournal}
      onLogout={handleLogout}
      onEdit={handleEditJournal}
    />
  );
}

export default App;
