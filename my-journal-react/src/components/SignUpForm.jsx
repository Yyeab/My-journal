import "./SignInForm.css";

function SignUpForm({ onSignIn }) {
  return (
    <div>
      <h1 className="animate-in signuph1">Join My-Journal</h1>
      <div className="container">
        <div className="card animate-in">
          <div className="header">
            <h2>Sign Up</h2>
            <p>Create your account to start journaling</p>
          </div>
          <form className="form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm">Confirm Password</label>
              <input
                id="confirm"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <button type="button" className="submit-button">
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
