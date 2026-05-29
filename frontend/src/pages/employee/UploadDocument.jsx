import { useState } from "react";
import axios from "axios";

function UploadDocument() {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [status, setStatus] = useState({});
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select PDF files");
      return;
    }

    setUploading(true);

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
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        📄 Upload Documents
      </h1>

      <input
        type="file"
        multiple
        accept=".pdf"
        onChange={(e) => setFiles([...e.target.files])}
      />

      <br />
      <br />

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>

      <div style={{ marginTop: "30px" }}>
        {files.map((file) => (
          <div
            key={file.name}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              background: "#f9fafb",
            }}
          >
            <h3>{file.name}</h3>

            <p>
              <strong>Type:</strong> {file.type}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <progress
              value={progress[file.name] || 0}
              max="100"
              style={{
                width: "100%",
                height: "20px",
              }}
            />

            <p style={{ marginTop: "10px" }}>
              {progress[file.name] || 0}%
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {status[file.name] || "Pending ⏳"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadDocument;