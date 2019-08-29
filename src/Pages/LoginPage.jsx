import React, { useState } from "react";
import { navigate } from "@reach/router";
import "./LoginPage.css";
import { verifyAccount } from "../Util";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loginHandler = (email, password) => {
    if (verifyAccount(email, password)) {
      navigate("/weather");
    } else {
      setError("email or password is incorrect");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <div className="background">
          <div className="layer">
            <span>teckro.</span>
          </div>
        </div>
        <div className="login-form">
          <div className="form-group ml-4 mt-4 mr-4">
            <div>
              <h3 className="welcome">Welcome</h3>
              <p>Please sign in to access your account</p>
            </div>
            <div className="d-flex flex-column">
              <input
                type="email"
                placeholder="E-Mail"
                className="shadow-sm form-control p-2 mb-3"
                onChange={e => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="shadow-sm form-control p-2 mb-2"
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="d-flex flex-row justify-content-between section-remember mb-4">
              <div className="">
                <a href="#">Forgot password?</a>
              </div>
              <div>
                <span className="mr-2">Remember Me</span>
                <input type="checkbox" />
              </div>
            </div>
            <div className="signin-section">
              <button className="btn loginButton rounded mr-3">
                Create Account
              </button>
              <button
                className="btn loginButton rounded"
                onClick={e => {
                  loginHandler(email, password);
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
