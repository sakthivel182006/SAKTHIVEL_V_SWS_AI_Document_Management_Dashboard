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
            <div className="loader-container">
                <div className="spinner"></div>
                <p>Loading your documents...</p>
            </div>
        );
    }

    return (
        <>
            <div className="documents-container">
                {/* Header Section */}
                <div className="header-section">
                    <div className="header-content">
                        <div>
                            <h1>My Documents</h1>
                            <p className="subtitle">Manage and organize your uploaded files</p>
                        </div>
                        <div className="total-count">
                            <span>📄</span>
                            <span>Total: {filteredDocuments.length} documents</span>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="search-filter-bar">
                        <div className="search-box">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by file name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-box">
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
                            <span className="filter-arrow">▼</span>
                        </div>
                    </div>
                </div>

                {/* Documents Grid */}
                {filteredDocuments.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📄</div>
                        <h3>No documents found</h3>
                        <p>
                            {searchTerm || selectedType !== "all" 
                                ? "Try adjusting your search or filter criteria" 
                                : "Upload your first document to get started"}
                        </p>
                    </div>
                ) : (
                    <div className="documents-grid">
                        {filteredDocuments.map((doc) => (
                            <div key={doc._id} className="document-card">
                                <div className="card-header"></div>
                                
                                <div className="card-content">
                                    <div className="file-info">
                                        <div className="file-icon">
                                            {getFileIcon(doc.fileType)}
                                        </div>
                                        <div className="file-details">
                                            <h3 title={doc.fileName}>
                                                {doc.fileName}
                                            </h3>
                                            <span className="file-type-badge">
                                                {doc.fileType?.split('/').pop().toUpperCase() || 'DOCUMENT'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="file-meta">
                                        <div className="meta-item">
                                            <span>💾</span>
                                            <span>{formatFileSize(doc.fileSize)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span>📅</span>
                                            <span>Uploaded: {new Date(doc.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        <a
                                            href={`http://localhost:5000/${doc.filePath}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-view"
                                        >
                                            👁️ View
                                        </a>
                                        <button
                                            onClick={() => downloadDocument(doc)}
                                            className="btn-download"
                                        >
                                            ⬇️ Download
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedDoc(doc);
                                                setShowDeleteModal(true);
                                            }}
                                            className="btn-delete"
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedDoc && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Delete Document</h3>
                            <button onClick={() => setShowDeleteModal(false)} className="modal-close">
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Are you sure you want to delete <strong>{selectedDoc.fileName}</strong>?
                                This action cannot be undone.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowDeleteModal(false)} className="btn-cancel">
                                Cancel
                            </button>
                            <button onClick={() => deleteDocument(selectedDoc._id)} className="btn-confirm-delete">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                /* Container Styles */
                .documents-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
                    padding: 2rem;
                }

                /* Header Section */
                .header-section {
                    max-width: 1280px;
                    margin: 0 auto 2rem auto;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    padding: 1.5rem;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .header-content h1 {
                    font-size: 2.5rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, #2563eb, #4f46e5);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    margin: 0;
                }

                .subtitle {
                    color: #6b7280;
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                }

                .total-count {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #eff6ff;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    color: #374151;
                }

                /* Search and Filter Bar */
                .search-filter-bar {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .search-box {
                    flex: 1;
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #9ca3af;
                }

                .search-box input {
                    width: 100%;
                    padding: 0.5rem 0.75rem 0.5rem 2.5rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.3s;
                }

                .search-box input:focus {
                    border-color: #3b82f6;
                    ring: 2px solid #3b82f6;
                }

                .filter-box {
                    position: relative;
                    min-width: 200px;
                }

                .filter-box select {
                    width: 100%;
                    padding: 0.5rem 2rem 0.5rem 0.75rem;
                    border: 1px solid #d1d5db;
                    border-radius: 0.5rem;
                    background: white;
                    font-size: 1rem;
                    cursor: pointer;
                    outline: none;
                    appearance: none;
                }

                .filter-arrow {
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #9ca3af;
                    pointer-events: none;
                }

                /* Documents Grid */
                .documents-grid {
                    max-width: 1280px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }

                /* Document Card */
                .document-card {
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .document-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
                }

                .card-header {
                    height: 0.5rem;
                    background: linear-gradient(135deg, #3b82f6, #4f46e5);
                }

                .card-content {
                    padding: 1.5rem;
                }

                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .file-icon {
                    font-size: 3rem;
                }

                .file-details {
                    flex: 1;
                    min-width: 0;
                }

                .file-details h3 {
                    font-weight: bold;
                    font-size: 1.125rem;
                    color: #1f2937;
                    margin: 0 0 0.5rem 0;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .file-type-badge {
                    display: inline-block;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #2563eb;
                    background: #eff6ff;
                    border-radius: 9999px;
                }

                .file-meta {
                    margin-top: 1rem;
                    space-y: 0.5rem;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.875rem;
                    color: #4b5563;
                    margin-bottom: 0.5rem;
                }

                .card-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                }

                .btn-view, .btn-download, .btn-delete {
                    flex: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }

                .btn-view {
                    background: #2563eb;
                    color: white;
                }

                .btn-view:hover {
                    background: #1d4ed8;
                }

                .btn-download {
                    background: #4b5563;
                    color: white;
                }

                .btn-download:hover {
                    background: #374151;
                }

                .btn-delete {
                    background: #dc2626;
                    color: white;
                }

                .btn-delete:hover {
                    background: #b91c1c;
                }

                /* Empty State */
                .empty-state {
                    max-width: 1280px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                    padding: 3rem;
                    text-align: center;
                }

                .empty-icon {
                    font-size: 6rem;
                    margin-bottom: 1rem;
                    color: #d1d5db;
                }

                .empty-state h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #4b5563;
                    margin-bottom: 0.5rem;
                }

                .empty-state p {
                    color: #9ca3af;
                }

                /* Loading Spinner */
                .loader-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .spinner {
                    width: 4rem;
                    height: 4rem;
                    border: 4px solid #e5e7eb;
                    border-top-color: #2563eb;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .loader-container p {
                    margin-top: 1rem;
                    color: #4b5563;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 1rem;
                }

                .modal-content {
                    background: white;
                    border-radius: 1rem;
                    max-width: 28rem;
                    width: 100%;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 1.5rem 0 1.5rem;
                }

                .modal-header h3 {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: #1f2937;
                    margin: 0;
                }

                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #9ca3af;
                    transition: color 0.2s;
                }

                .modal-close:hover {
                    color: #4b5563;
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .modal-body p {
                    color: #4b5563;
                    margin: 0;
                    line-height: 1.5;
                }

                .modal-footer {
                    display: flex;
                    gap: 0.75rem;
                    padding: 0 1.5rem 1.5rem 1.5rem;
                }

                .btn-cancel, .btn-confirm-delete {
                    flex: 1;
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-cancel {
                    background: white;
                    border: 1px solid #d1d5db;
                    color: #374151;
                }

                .btn-cancel:hover {
                    background: #f9fafb;
                }

                .btn-confirm-delete {
                    background: #dc2626;
                    color: white;
                }

                .btn-confirm-delete:hover {
                    background: #b91c1c;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .documents-container {
                        padding: 1rem;
                    }

                    .header-content h1 {
                        font-size: 1.875rem;
                    }

                    .documents-grid {
                        grid-template-columns: 1fr;
                    }

                    .search-filter-bar {
                        flex-direction: column;
                    }

                    .filter-box {
                        min-width: auto;
                    }
                }
            `}</style>
        </>
    );
};

export default MyDocuments;