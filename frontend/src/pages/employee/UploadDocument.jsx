import { useState } from "react";
import axios from "axios";

function UploadDocument() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState({});
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select PDF files");
      return;
    }

    setUploading(true);
    setLoading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("document", file);

      setStatus((prev) => ({
        ...prev,
        [file.name]: "Uploading...",
      }));

      try {
        await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event) => {
              const percent = Math.round(
                (event.loaded * 100) / event.total
              );
              setProgress((prev) => ({
                ...prev,
                [file.name]: percent,
              }));
            },
          }
        );

        setStatus((prev) => ({
          ...prev,
          [file.name]: "Completed ✅",
        }));
      } catch (error) {
        console.error(error);
        setStatus((prev) => ({
          ...prev,
          [file.name]: "Failed ❌",
        }));
      }
    }

    setUploading(false);
    setLoading(false);
  };

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    const newProgress = { ...progress };
    const newStatus = { ...status };
    delete newProgress[fileName];
    delete newStatus[fileName];
    setProgress(newProgress);
    setStatus(newStatus);
  };

  return (
    <div className="upload-document-wrapper">
      <div className="upload-document-card">
        <h1 className="upload-document-title">
          📄 Upload Documents
        </h1>

        <div className="upload-document-area">
          <input
            type="file"
            id="upload-file-input"
            multiple
            accept=".pdf"
            onChange={(e) => setFiles([...files, ...e.target.files])}
            className="upload-file-input"
            disabled={loading}
          />
          <label htmlFor="upload-file-input" className={`upload-file-label ${loading ? 'disabled' : ''}`}>
            Choose PDF Files
          </label>
          <p className="upload-file-hint">Supported format: PDF</p>
        </div>

        {files.length > 0 && (
          <button
            onClick={handleUpload}
            disabled={uploading || loading}
            className={`upload-submit-btn ${uploading || loading ? 'upload-submit-disabled' : ''}`}
          >
            {loading ? (
              <>
                <span className="upload-spinner"></span>
                Uploading...
              </>
            ) : (
              `Upload ${files.length} File${files.length > 1 ? 's' : ''}`
            )}
          </button>
        )}

        {loading && (
          <div className="upload-loading-overlay">
            <div className="upload-loading-content">
              <div className="upload-loading-spinner"></div>
              <p>Uploading documents. Please wait...</p>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="upload-files-section">
            <h3 className="upload-files-title">Selected Files ({files.length})</h3>
            {files.map((file) => (
              <div key={file.name} className="upload-file-item">
                <div className="upload-file-header">
                  <div className="upload-file-info">
                    <span className="upload-file-icon">📄</span>
                    <div className="upload-file-details">
                      <strong className="upload-file-name">{file.name}</strong>
                      <div className="upload-file-meta">
                        <span className="upload-file-type">{file.type}</span>
                        <span className="upload-file-size">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(file.name)}
                    className="upload-remove-btn"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </div>

                <div className="upload-progress-wrapper">
                  <progress
                    value={progress[file.name] || 0}
                    max="100"
                    className="upload-progress-bar"
                  />
                  <div className="upload-progress-stats">
                    <span className="upload-progress-percent">
                      {progress[file.name] || 0}%
                    </span>
                    <span className={`upload-status ${status[file.name]?.includes('Completed') ? 'upload-status-success' : 
                                                  status[file.name]?.includes('Failed') ? 'upload-status-failed' : 
                                                  status[file.name]?.includes('Uploading') ? 'upload-status-uploading' : ''}`}>
                      {status[file.name] || "Pending ⏳"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        /* Container styles - isolated to this component */
        .upload-document-wrapper {
          min-height: calc(100vh - 200px);
          background: #f0f2f5;
          padding: 40px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          position: relative;
        }

        .upload-document-card {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 30px;
          position: relative;
        }

        .upload-document-title {
          text-align: center;
          color: #1a1a1a;
          font-size: 28px;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .upload-document-area {
          text-align: center;
          padding: 30px;
          background: #fafafa;
          border: 2px dashed #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          position: relative;
        }

        .upload-file-input {
          display: none;
        }

        .upload-file-label {
          display: inline-block;
          background: #2563eb;
          color: white;
          padding: 10px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
          transition: background 0.2s;
        }

        .upload-file-label:hover:not(.disabled) {
          background: #1d4ed8;
        }

        .upload-file-label.disabled {
          background: #9ca3af;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .upload-file-hint {
          margin-top: 12px;
          color: #666;
          font-size: 14px;
        }

        .upload-submit-btn {
          width: 100%;
          background: #2563eb;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .upload-submit-btn:hover:not(.upload-submit-disabled) {
          background: #1d4ed8;
        }

        .upload-submit-disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .upload-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid white;
          border-top-color: transparent;
          border-radius: 50%;
          animation: upload-spin 0.6s linear infinite;
          display: inline-block;
        }

        @keyframes upload-spin {
          to { transform: rotate(360deg); }
        }

        /* Loading Overlay */
        .upload-loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }

        .upload-loading-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: upload-fadeIn 0.3s ease;
        }

        @keyframes upload-fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .upload-loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e5e7eb;
          border-top-color: #2563eb;
          border-radius: 50%;
          animation: upload-spin 1s linear infinite;
          margin: 0 auto 1rem auto;
        }

        .upload-loading-content p {
          color: #4b5563;
          font-size: 14px;
          margin: 0;
        }

        .upload-files-section {
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
        }

        .upload-files-title {
          color: #374151;
          font-size: 18px;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .upload-file-item {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 15px;
          background: #f9fafb;
          transition: box-shadow 0.2s;
        }

        .upload-file-item:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .upload-file-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .upload-file-info {
          display: flex;
          gap: 12px;
          flex: 1;
        }

        .upload-file-icon {
          font-size: 24px;
        }

        .upload-file-details {
          flex: 1;
        }

        .upload-file-name {
          display: block;
          color: #1f2937;
          font-size: 14px;
          margin-bottom: 6px;
          word-break: break-word;
        }

        .upload-file-meta {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: #6b7280;
        }

        .upload-remove-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px;
          transition: color 0.2s;
        }

        .upload-remove-btn:hover:not(:disabled) {
          color: #ef4444;
        }

        .upload-remove-btn:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .upload-progress-wrapper {
          margin-top: 8px;
        }

        .upload-progress-bar {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .upload-progress-bar::-webkit-progress-bar {
          background-color: #e5e7eb;
          border-radius: 4px;
        }

        .upload-progress-bar::-webkit-progress-value {
          background-color: #2563eb;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .upload-progress-stats {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          font-size: 12px;
        }

        .upload-progress-percent {
          color: #4b5563;
          font-weight: 500;
        }

        .upload-status {
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 500;
        }

        .upload-status-uploading {
          background: #dbeafe;
          color: #1e40af;
        }

        .upload-status-success {
          background: #d1fae5;
          color: #065f46;
        }

        .upload-status-failed {
          background: #fee2e2;
          color: #991b1b;
        }

        @media (max-width: 640px) {
          .upload-document-wrapper {
            padding: 20px;
          }

          .upload-document-card {
            padding: 20px;
          }

          .upload-document-title {
            font-size: 24px;
          }

          .upload-document-area {
            padding: 20px;
          }

          .upload-file-meta {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}

export default UploadDocument;