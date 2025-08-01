import "./Header.css";

function Header({ onLogout }) {
  return (
    <header className="homepage-header">
      <div>
        <span className="homepage-app-title">MY-JOURNAL</span>
      </div>
      <button className="homepage-logout" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Header;
