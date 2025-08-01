import React from "react";
import "./SignInForm.css";

export default function SignInForm({ onSignUp, onAuthSuccess }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleSignIn(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        localStorage.setItem("token", data.token);
        if (onAuthSuccess) onAuthSuccess(data.user);
      } else if (data.error) {
        setError(data.error);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div>
      <h1 className="animate-in">Welcome</h1>
      <div className="container">
        <div className="card animate-in">
          <div className="header">
            <h2>Sign In</h2>
            <p>Enter your email and password to access your journal</p>
          </div>
          <form className="form" onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="form-error">{error}</div>}
            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>
          <div className="signup">
            Don't have an account?{" "}
            <a href="#" onClick={onSignUp}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
