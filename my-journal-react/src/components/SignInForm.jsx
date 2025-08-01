import "./SignInForm.css";

export default function SignInForm({ onSignUp }) {
  return (
    <div>
      <h1 className="animate-in">Welcome</h1>
      <div className="container">
        <div className="card animate-in">
          <div className="header">
            <h2>Sign In</h2>
            <p>Enter your email and password to access your journal</p>
          </div>
          <form className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <button type="button" className="submit-button">
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
