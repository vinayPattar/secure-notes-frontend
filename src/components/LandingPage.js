import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Secure Notes</h1>
        <p>Your secure and private note-taking app.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="cta-button">Sign Up</Link>
          <Link to="/login" className="cta-button">Log In</Link>
        </div>
      </header>
      <section className="landing-features">
        <h2>Why Choose Secure Notes?</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Secure and Private</h3>
            <p>We use state-of-the-art encryption to ensure your notes are safe and private.</p>
          </div>
          <div className="feature-item">
            <h3>Easy to Use</h3>
            <p>Our user-friendly interface makes it easy to create, manage, and organize your notes.</p>
          </div>
          <div className="feature-item">
            <h3>Access Anywhere</h3>
            <p>Access your notes from any device, anywhere in the world.</p>
          </div>
          <div className="feature-item">
            <h3>Two-Factor Authentication</h3>
            <p>Enhance your account security with optional two-factor authentication.</p>
          </div>
          <div className="feature-item">
            <h3>Group Sharing</h3>
            <p>Share your notes with groups and collaborate seamlessly.</p>
          </div>
        </div>
      </section>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Secure Notes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
