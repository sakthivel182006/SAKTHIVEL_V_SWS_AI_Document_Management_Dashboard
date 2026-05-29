import "./Home.css";

function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero-content">

          <span className="badge">
            Full Stack Assessment Project
          </span>

          <h1>
            Document Management Dashboard
          </h1>

          <p>
            Upload company PDF documents, monitor upload progress,
            manage files efficiently, and receive notifications
            when document processing is completed.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              Upload Documents
            </button>

            <button className="secondary-btn">
              View Documents
            </button>
          </div>

        </div>

      </section>

      <section className="features">

        <div className="card">
          <h3>📤 Bulk Upload</h3>
          <p>
            Upload one or multiple PDF files simultaneously.
          </p>
        </div>

        <div className="card">
          <h3>📊 Live Progress</h3>
          <p>
            Real-time upload tracking for every document.
          </p>
        </div>

        <div className="card">
          <h3>🔔 Notifications</h3>
          <p>
            Instant alerts when processing is completed.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;