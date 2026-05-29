import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-badge">
            Full Stack Assessment Project
          </span>
          <h1 className="home-title">
            Document Management Dashboard
          </h1>
          <p className="home-description">
            Upload company PDF documents, monitor upload progress,
            manage files efficiently, and receive notifications
            when document processing is completed.
          </p>
          <div className="home-buttons">
            <button 
              className="home-btn-primary"
              onClick={() => navigate("/upload")}
            >
              📤 Upload Documents
            </button>
            <button 
              className="home-btn-secondary"
              onClick={() => navigate("/documents")}
            >
              📄 View Documents
            </button>
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature-card">
          <div className="home-feature-icon">📤</div>
          <h3>Bulk Upload</h3>
          <p>Upload one or multiple PDF files simultaneously.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon">📊</div>
          <h3>Live Progress</h3>
          <p>Real-time upload tracking for every document.</p>
        </div>
        <div className="home-feature-card">
          <div className="home-feature-icon">🔔</div>
          <h3>Instant Alerts</h3>
          <p>Instant alerts when processing is completed Through The Smtp mail notification.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;