import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="container">
      <div className="card">
        
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

        <form>
          
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="btn">Sign In</button>

        </form>

        <p className="footer">
          Don't have an account? <span>Sign up</span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;