import React from "react";
import "./SignInForm.css";
import axios from "axios";

function SignUpForm({ onSignIn }) {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    if (!email || !username || !password || !confirm) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/users", {
        user: {
          email,
          username,
          password,
          password_confirmation: confirm,
        },
      });
      if (response.data && response.data.token) {
        setSuccess("Account created! Redirecting to sign in...");
        setTimeout(() => {
          setSuccess("");
          if (onSignIn) onSignIn();
        }, 1800);
      } else {
        setError("Sign up failed");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          setError(err.response.data.errors.join(", "));
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Sign up failed");
        }
      } else {
        setError("Network error");
      }
    }
  }

  return (
    <div>
      <h1 className="animate-in signuph1">Join My-Journal</h1>
      <div className="container">
        <div className="card animate-in">
          <div className="header">
            <h2>Sign Up</h2>
            <p>Create your account to start journaling</p>
          </div>
          <form className="form" onSubmit={handleSignUp}>
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
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
          <div className="signup">
            Already have an account?{" "}
            <a href="#" onClick={onSignIn}>
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUpForm;
