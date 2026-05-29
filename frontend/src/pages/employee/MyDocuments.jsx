import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const MyDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    const getDocuments = async () => {
        try {
            setLoading(true);
            const response = await api.get("/api/upload");
            setDocuments(response.data.documents);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (docId) => {
        try {
            await api.delete(`/api/upload/${docId}`);
            await getDocuments();
            setShowDeleteModal(false);
            setSelectedDoc(null);
        } catch (error) {
            console.log(error);
        }
    };

    const downloadDocument = (doc) => {
        const link = document.createElement('a');
        link.href = `http://localhost:5000/${doc.filePath}`;
        link.download = doc.fileName;
        link.click();
    };

    useEffect(() => {
        getDocuments();
    }, []);

    const fileTypes = ["all", ...new Set(documents.map(doc => doc.fileType))];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === "all" || doc.fileType === selectedType;
        return matchesSearch && matchesType;
    });

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileType) => {
        if (fileType === "application/pdf") return "📄";
        return "📁";
    };

    if (loading) {
        return (
            <div className="my-docs-loader">
                <div className="my-docs-spinner"></div>
                <p>Loading your documents...</p>
            </div>
        );
    }

    return (
        <>
            <div className="my-docs-container">
                <div className="my-docs-header">
                    <div className="my-docs-header-content">
                        <div>
                            <h1>My Documents</h1>
                            <p>Manage and organize your uploaded files</p>
                        </div>
                        <div className="my-docs-total">
                            <span>📄</span>
                            <span>Total: {filteredDocuments.length} documents</span>
                        </div>
                    </div>

                    <div className="my-docs-search-bar">
                        <div className="my-docs-search-box">
                            <span className="my-docs-search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by file name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="my-docs-filter-box">
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                {fileTypes.map(type => (
                                    <option key={type} value={type}>
                                        {type === "all" ? "All Types" : type.split('/').pop().toUpperCase()}
                                    </option>
                                ))}
                            </select>
                            <span className="my-docs-filter-arrow">▼</span>
                        </div>
                    </div>
                </div>

                {filteredDocuments.length === 0 ? (
                    <div className="my-docs-empty">
                        <div className="my-docs-empty-icon">📄</div>
                        <h3>No documents found</h3>
                        <p>
                            {searchTerm || selectedType !== "all" 
                                ? "Try adjusting your search or filter criteria" 
                                : "Upload your first document to get started"}
                        </p>
                    </div>
                ) : (
                    <div className="my-docs-grid">
                        {filteredDocuments.map((doc) => (
                            <div key={doc._id} className="my-docs-card">
                                <div className="my-docs-card-header"></div>
                                
                                <div className="my-docs-card-content">
                                    <div className="my-docs-file-info">
                                        <div className="my-docs-file-icon">
                                            {getFileIcon(doc.fileType)}
                                        </div>
                                        <div className="my-docs-file-details">
                                            <h3 title={doc.fileName}>
                                                {doc.fileName}
                                            </h3>
                                            <span className="my-docs-file-badge">
                                                {doc.fileType?.split('/').pop().toUpperCase() || 'DOCUMENT'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-docs-file-meta">
                                        <div className="my-docs-meta-item">
                                            <span>💾</span>
                                            <span>{formatFileSize(doc.fileSize)}</span>
                                        </div>
                                        <div className="my-docs-meta-item">
                                            <span>📅</span>
                                            <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="my-docs-meta-item">
                                            <span>📌</span>
                                            <span
                                                className={
                                                    doc.status === "APPROVED"
                                                        ? "approved-status"
                                                        : doc.status === "REJECTED"
                                                        ? "rejected-status"
                                                        : "verification-status"
                                                }
                                            >
                                                {doc.status || "UNDER_VERIFICATION"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-docs-card-actions">
                                        <a
                                            href={`http://localhost:5000/${doc.filePath}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="my-docs-btn-view"
                                        >
                                            👁️ View
                                        </a>
                                        <button
                                            onClick={() => downloadDocument(doc)}
                                            className="my-docs-btn-download"
                                        >
                                            ⬇️ Download
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedDoc(doc);
                                                setShowDeleteModal(true);
                                            }}
                                            className="my-docs-btn-delete"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showDeleteModal && selectedDoc && (
                <div className="my-docs-modal">
                    <div className="my-docs-modal-content">
                        <div className="my-docs-modal-header">
                            <h3>Delete Document</h3>
                            <button onClick={() => setShowDeleteModal(false)} className="my-docs-modal-close">
                                ×
                            </button>
                        </div>
                        <div className="my-docs-modal-body">
                            <p>
                                Are you sure you want to delete <strong>{selectedDoc.fileName}</strong>?
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="my-docs-modal-footer">
                            <button onClick={() => setShowDeleteModal(false)} className="my-docs-btn-cancel">
                                Cancel
                            </button>
                            <button onClick={() => deleteDocument(selectedDoc._id)} className="my-docs-btn-confirm">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .my-docs-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 2rem;
                }

                .my-docs-header {
                    max-width: 1280px;
                    margin: 0 auto 2rem auto;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                    padding: 1.5rem;
                }

                .my-docs-header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .my-docs-header-content h1 {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #1a1a1a;
                    margin: 0;
                }

                .my-docs-header-content p {
                    color: #666;
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                }

                .my-docs-total {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #667eea;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                }

                .my-docs-search-bar {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .my-docs-search-box {
                    flex: 1;
                    position: relative;
                }

                .my-docs-search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #999;
                }

                .my-docs-search-box input {
                    width: 100%;
                    padding: 0.7rem 0.7rem 0.7rem 2.5rem;
                    border: 1px solid #ddd;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    outline: none;
                }

                .my-docs-search-box input:focus {
                    border-color: #667eea;
                }

                .my-docs-filter-box {
                    position: relative;
                    min-width: 200px;
                }

                .my-docs-filter-box select {
                    width: 100%;
                    padding: 0.7rem 2rem 0.7rem 0.7rem;
                    border: 1px solid #ddd;
                    border-radius: 0.5rem;
                    background: white;
                    font-size: 1rem;
                    cursor: pointer;
                    outline: none;
                    appearance: none;
                }

                .my-docs-filter-arrow {
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #999;
                    pointer-events: none;
                }

                .my-docs-grid {
                    max-width: 1280px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                .my-docs-card {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    transition: transform 0.3s, box-shadow 0.3s;
                    overflow: hidden;
                }

                .my-docs-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                }

                .my-docs-card-header {
                    height: 0.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .my-docs-card-content {
                    padding: 1.5rem;
                }

                .my-docs-file-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .my-docs-file-icon {
                    font-size: 3rem;
                }

                .my-docs-file-details {
                    flex: 1;
                    min-width: 0;
                }

                .my-docs-file-details h3 {
                    font-weight: bold;
                    font-size: 1rem;
                    color: #1a1a1a;
                    margin: 0 0 0.5rem 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .my-docs-file-badge {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.7rem;
                    font-weight: 600;
                    color: #667eea;
                    background: #f0f0ff;
                    border-radius: 20px;
                }

                .my-docs-file-meta {
                    margin: 1rem 0;
                }

                .my-docs-meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: #666;
                    margin-bottom: 0.5rem;
                }

                /* Status Styles */
                .approved-status {
                    color: #38a169;
                    font-weight: 600;
                    background: #f0fff4;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    display: inline-block;
                }

                .rejected-status {
                    color: #e53e3e;
                    font-weight: 600;
                    background: #fff5f5;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    display: inline-block;
                }

                .verification-status {
                    color: #ed8936;
                    font-weight: 600;
                    background: #fffaf0;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    display: inline-block;
                }

                .my-docs-card-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .my-docs-btn-view, .my-docs-btn-download, .my-docs-btn-delete {
                    flex: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .my-docs-btn-view {
                    background: #667eea;
                    color: white;
                }

                .my-docs-btn-view:hover {
                    background: #5a67d8;
                }

                .my-docs-btn-download {
                    background: #48bb78;
                    color: white;
                }

                .my-docs-btn-download:hover {
                    background: #38a169;
                }

                .my-docs-btn-delete {
                    background: #f56565;
                    color: white;
                }

                .my-docs-btn-delete:hover {
                    background: #e53e3e;
                }

                .my-docs-empty {
                    max-width: 1280px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 1rem;
                    padding: 3rem;
                    text-align: center;
                }

                .my-docs-empty-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                }

                .my-docs-empty h3 {
                    font-size: 1.5rem;
                    color: #4a5568;
                    margin-bottom: 0.5rem;
                }

                .my-docs-empty p {
                    color: #a0aec0;
                }

                .my-docs-loader {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .my-docs-spinner {
                    width: 4rem;
                    height: 4rem;
                    border: 4px solid rgba(255,255,255,0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: my-docs-spin 1s linear infinite;
                }

                @keyframes my-docs-spin {
                    to { transform: rotate(360deg); }
                }

                .my-docs-loader p {
                    margin-top: 1rem;
                    color: white;
                }

                .my-docs-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                }

                .my-docs-modal-content {
                    background: white;
                    border-radius: 1rem;
                    max-width: 400px;
                    width: 100%;
                    animation: my-docs-fadeIn 0.3s;
                }

                @keyframes my-docs-fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .my-docs-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 1.5rem 0 1.5rem;
                }

                .my-docs-modal-header h3 {
                    margin: 0;
                    color: #1a1a1a;
                }

                .my-docs-modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #999;
                }

                .my-docs-modal-body {
                    padding: 1.5rem;
                }

                .my-docs-modal-body p {
                    margin: 0;
                    color: #4a5568;
                    line-height: 1.5;
                }

                .my-docs-modal-footer {
                    display: flex;
                    gap: 0.75rem;
                    padding: 0 1.5rem 1.5rem 1.5rem;
                }

                .my-docs-btn-cancel, .my-docs-btn-confirm {
                    flex: 1;
                    padding: 0.5rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                }

                .my-docs-btn-cancel {
                    background: #e2e8f0;
                    color: #4a5568;
                }

                .my-docs-btn-cancel:hover {
                    background: #cbd5e0;
                }

                .my-docs-btn-confirm {
                    background: #f56565;
                    color: white;
                }

                .my-docs-btn-confirm:hover {
                    background: #e53e3e;
                }

                @media (max-width: 768px) {
                    .my-docs-container {
                        padding: 1rem;
                    }
                    
                    .my-docs-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .my-docs-search-bar {
                        flex-direction: column;
                    }
                    
                    .my-docs-filter-box {
                        min-width: auto;
                    }
                }
            `}</style>
        </>
    );
};

export default MyDocuments;