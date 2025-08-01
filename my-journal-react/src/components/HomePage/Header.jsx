import "./Header.css";

function Header() {
  return (
    <header className="homepage-header">
      <div>
        <span className="homepage-app-title">MY-JOURNAL</span>
      </div>
      <button className="homepage-logout">Logout</button>
    </header>
  );
}

export default Header;
