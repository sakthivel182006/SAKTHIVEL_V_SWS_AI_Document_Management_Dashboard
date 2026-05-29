import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const UpdateDoucmentstatus = () => {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [updatingId, setUpdatingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const getDocuments = async () => {

        try {

            const response =
                await api.get("/api/upload");

            setDocuments(
                response.data.documents
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    const updateStatus = async (
        id,
        status
    ) => {

        try {
            setUpdatingId(id);
            setLoading(true);

            await api.put(
                `/api/upload/status/${id}`,
                {
                    status
                }
            );

            getDocuments();

        }
        catch (error) {

            console.log(error);

        }
        finally {
            setUpdatingId(null);
            setLoading(false);
        }

    };

    useEffect(() => {

        getDocuments();

    }, []);

    // Filter documents based on search and status filter
    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || doc.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Get statistics
    const totalDocs = documents.length;
    const approvedDocs = documents.filter(doc => doc.status === "APPROVED").length;
    const rejectedDocs = documents.filter(doc => doc.status === "REJECTED").length;
    const pendingDocs = documents.filter(doc => doc.status !== "APPROVED" && doc.status !== "REJECTED").length;

    return (
        <>
            <div className="status-update-container">
                <div className="status-update-card">
                    <div className="status-update-header">
                        <h1 className="status-update-title">
                            📋 Update Document Status
                        </h1>
                        <div className="status-update-stats">
                            <div className="stat-card total">
                                <div className="stat-value">{totalDocs}</div>
                                <div className="stat-label">Total</div>
                            </div>
                            <div className="stat-card approved">
                                <div className="stat-value">{approvedDocs}</div>
                                <div className="stat-label">Approved</div>
                            </div>
                            <div className="stat-card rejected">
                                <div className="stat-value">{rejectedDocs}</div>
                                <div className="stat-label">Rejected</div>
                            </div>
                            <div className="stat-card pending">
                                <div className="stat-value">{pendingDocs}</div>
                                <div className="stat-label">Pending</div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="status-update-filters">
                        <div className="search-box-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                placeholder="Search by file name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            {searchTerm && (
                                <button 
                                    className="clear-search"
                                    onClick={() => setSearchTerm("")}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        <div className="filter-wrapper">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="status-filter-select"
                            >
                                <option value="all">All Status</option>
                                <option value="APPROVED">✅ Approved</option>
                                <option value="REJECTED">❌ Rejected</option>
                                <option value="UNDER_VERIFICATION">⏳ Under Verification</option>
                            </select>
                        </div>
                    </div>

                    <div className="status-update-table-wrapper">
                        <table className="status-update-table">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Uploaded Date</th>
                                    <th>Current Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDocuments.length > 0 ? (
                                    filteredDocuments.map((doc) => (
                                        <tr key={doc._id} className="status-update-row">
                                            <td>
                                                <div className="status-update-file-cell">
                                                    <span className="status-update-file-icon">📄</span>
                                                    <span className="status-update-file-name" title={doc.fileName}>
                                                        {doc.fileName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                {new Date(
                                                    doc.uploadedDate ||
                                                    doc.createdAt
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>
                                                <span
                                                    className={`status-update-badge ${
                                                        doc.status === "APPROVED"
                                                            ? "status-update-approved"
                                                            : doc.status === "REJECTED"
                                                            ? "status-update-rejected"
                                                            : "status-update-pending"
                                                    }`}
                                                >
                                                    {doc.status || "UNDER_VERIFICATION"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="status-update-actions">
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                doc._id,
                                                                "APPROVED"
                                                            )
                                                        }
                                                        disabled={updatingId === doc._id || loading || doc.status === "APPROVED"}
                                                        className="status-update-btn-approve"
                                                    >
                                                        {updatingId === doc._id ? (
                                                            <span className="status-update-btn-spinner"></span>
                                                        ) : (
                                                            "✓ Approve"
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            updateStatus(
                                                                doc._id,
                                                                "REJECTED"
                                                            )
                                                        }
                                                        disabled={updatingId === doc._id || loading || doc.status === "REJECTED"}
                                                        className="status-update-btn-reject"
                                                    >
                                                        {updatingId === doc._id ? (
                                                            <span className="status-update-btn-spinner"></span>
                                                        ) : (
                                                            "✗ Reject"
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="status-update-no-data">
                                            <div className="status-update-no-data-content">
                                                <span className="status-update-no-data-icon">📭</span>
                                                <p>
                                                    {searchTerm || statusFilter !== "all" 
                                                        ? "No documents match your search criteria"
                                                        : "No documents found"}
                                                </p>
                                                {(searchTerm || statusFilter !== "all") && (
                                                    <button 
                                                        className="clear-filters-btn"
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setStatusFilter("all");
                                                        }}
                                                    >
                                                        Clear Filters
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="status-update-overlay">
                    <div className="status-update-overlay-content">
                        <div className="status-update-overlay-spinner"></div>
                        <p>Updating document status...</p>
                    </div>
                </div>
            )}

            <style>{`
                .status-update-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 2rem;
                }

                .status-update-card {
                    max-width: 1200px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 1rem;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                    overflow: hidden;
                    animation: statusUpdateFadeIn 0.5s ease;
                }

                @keyframes statusUpdateFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .status-update-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 2rem;
                }

                .status-update-title {
                    color: white;
                    margin: 0 0 1.5rem 0;
                    font-size: 2rem;
                    text-align: center;
                }

                .status-update-stats {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .stat-card {
                    background: rgba(255,255,255,0.2);
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 100px;
                    backdrop-filter: blur(10px);
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: white;
                }

                .stat-label {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.9);
                    margin-top: 0.25rem;
                }

                .stat-card.approved {
                    background: rgba(72, 187, 120, 0.3);
                }

                .stat-card.rejected {
                    background: rgba(245, 101, 101, 0.3);
                }

                .stat-card.pending {
                    background: rgba(237, 137, 54, 0.3);
                }

                /* Search and Filter Bar */
                .status-update-filters {
                    padding: 1.5rem;
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                    border-bottom: 1px solid #e2e8f0;
                    background: #f7fafc;
                }

                .search-box-wrapper {
                    flex: 1;
                    position: relative;
                }

                .search-icon {
                    position: absolute;
                    left: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #a0aec0;
                    font-size: 1rem;
                }

                .search-input {
                    width: 100%;
                    padding: 0.7rem 2rem 0.7rem 2.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    font-size: 0.9rem;
                    outline: none;
                    transition: all 0.2s;
                }

                .search-input:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .clear-search {
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: #a0aec0;
                    font-size: 1rem;
                    padding: 0;
                }

                .clear-search:hover {
                    color: #f56565;
                }

                .filter-wrapper {
                    min-width: 200px;
                }

                .status-filter-select {
                    width: 100%;
                    padding: 0.7rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 0.5rem;
                    font-size: 0.9rem;
                    outline: none;
                    cursor: pointer;
                    background: white;
                }

                .status-filter-select:focus {
                    border-color: #667eea;
                }

                .clear-filters-btn {
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: #667eea;
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                }

                .clear-filters-btn:hover {
                    background: #5a67d8;
                }

                .status-update-table-wrapper {
                    overflow-x: auto;
                    padding: 1.5rem;
                }

                .status-update-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                }

                .status-update-table thead {
                    background: #f7fafc;
                    border-bottom: 2px solid #e2e8f0;
                }

                .status-update-table th {
                    text-align: left;
                    padding: 1rem;
                    font-weight: 600;
                    color: #4a5568;
                    font-size: 0.9rem;
                }

                .status-update-table td {
                    padding: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                    vertical-align: middle;
                }

                .status-update-row:hover {
                    background: #f7fafc;
                    transition: background 0.2s;
                }

                .status-update-file-cell {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .status-update-file-icon {
                    font-size: 1.2rem;
                }

                .status-update-file-name {
                    font-weight: 500;
                    color: #2d3748;
                    max-width: 300px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .status-update-badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 600;
                }

                .status-update-approved {
                    background: #d1fae5;
                    color: #065f46;
                    border: 1px solid #a7f3d0;
                }

                .status-update-rejected {
                    background: #fee2e2;
                    color: #991b1b;
                    border: 1px solid #fecaca;
                }

                .status-update-pending {
                    background: #fed7aa;
                    color: #92400e;
                    border: 1px solid #fed7aa;
                }

                .status-update-actions {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .status-update-btn-approve, .status-update-btn-reject {
                    padding: 0.5rem 1rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    min-width: 90px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .status-update-btn-approve {
                    background: #48bb78;
                    color: white;
                }

                .status-update-btn-approve:hover:not(:disabled) {
                    background: #38a169;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(72, 187, 120, 0.3);
                }

                .status-update-btn-reject {
                    background: #f56565;
                    color: white;
                }

                .status-update-btn-reject:hover:not(:disabled) {
                    background: #e53e3e;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(245, 101, 101, 0.3);
                }

                .status-update-btn-approve:disabled,
                .status-update-btn-reject:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }

                .status-update-btn-spinner {
                    width: 14px;
                    height: 14px;
                    border: 2px solid white;
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: statusUpdateSpin 0.6s linear infinite;
                    display: inline-block;
                }

                @keyframes statusUpdateSpin {
                    to { transform: rotate(360deg); }
                }

                .status-update-no-data {
                    text-align: center;
                    padding: 3rem !important;
                }

                .status-update-no-data-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    color: #a0aec0;
                }

                .status-update-no-data-icon {
                    font-size: 3rem;
                }

                .status-update-overlay {
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

                .status-update-overlay-content {
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    text-align: center;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: statusUpdateOverlayFadeIn 0.3s ease;
                }

                @keyframes statusUpdateOverlayFadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .status-update-overlay-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #e5e7eb;
                    border-top-color: #667eea;
                    border-radius: 50%;
                    animation: statusUpdateSpin 1s linear infinite;
                    margin: 0 auto 1rem auto;
                }

                .status-update-overlay-content p {
                    color: #4b5563;
                    margin: 0;
                    font-size: 0.9rem;
                }

                @media (max-width: 768px) {
                    .status-update-container {
                        padding: 1rem;
                    }

                    .status-update-title {
                        font-size: 1.5rem;
                    }

                    .status-update-header {
                        padding: 1rem;
                    }

                    .status-update-table-wrapper {
                        padding: 1rem;
                    }

                    .status-update-file-name {
                        max-width: 150px;
                    }

                    .status-update-actions {
                        flex-direction: column;
                    }

                    .status-update-btn-approve,
                    .status-update-btn-reject {
                        width: 100%;
                    }

                    .status-update-filters {
                        flex-direction: column;
                    }

                    .filter-wrapper {
                        min-width: auto;
                    }
                }
            `}</style>
        </>
    );

};

export default UpdateDoucmentstatus;