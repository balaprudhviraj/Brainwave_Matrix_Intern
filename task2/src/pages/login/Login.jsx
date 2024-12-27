import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./login.css";
import back from "../../assets/images/my-account.jpg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to the home page after successful login
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Google login failed.");
    }
  };

  return (
    <section className="login">
      <div className="container">
        <div className="backImg">
          <img src={back} alt="" />
          <div className="text">
            <h3>Login</h3>
            <h1>My account</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <span>Email address *</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span>Password *</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>

        <div className="google-login">
          <button onClick={handleGoogleLogin} className="google-btn">
            Login with Google
          </button>
        </div>

        {/* Add the Sign-up link */}
        <div className="signup-link">
          <p>
            Don’t have an account?{" "}
            <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
