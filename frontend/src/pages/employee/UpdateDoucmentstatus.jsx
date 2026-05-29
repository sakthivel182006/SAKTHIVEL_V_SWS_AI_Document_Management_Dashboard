import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const UpdateDoucmentstatus = () => {

    const [documents, setDocuments] = useState([]);

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

    };

    useEffect(() => {

        getDocuments();

    }, []);

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Update Document Status
            </h1>

            <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                width="100%"
                style={{
                    marginTop: "20px"
                }}
            >

                <thead>

                    <tr>

                        <th>
                            File Name
                        </th>

                        <th>
                            Uploaded Date
                        </th>

                        <th>
                            Current Status
                        </th>

                        <th>
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        documents.map(
                            (doc) => (

                                <tr
                                    key={doc._id}
                                >

                                    <td>
                                        {doc.fileName}
                                    </td>

                                    <td>
                                        {
                                            new Date(
                                                doc.uploadedDate ||
                                                doc.createdAt
                                            ).toLocaleDateString()
                                        }
                                    </td>

                                    <td>

                                        <span
                                            style={{
                                                padding: "5px 10px",
                                                borderRadius: "5px",
                                                background:
                                                    doc.status === "APPROVED"
                                                        ? "lightgreen"
                                                        : doc.status === "REJECTED"
                                                        ? "#ffb3b3"
                                                        : "#ffe699"
                                            }}
                                        >
                                            {
                                                doc.status
                                            }
                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    doc._id,
                                                    "APPROVED"
                                                )
                                            }
                                            style={{
                                                marginRight: "10px",
                                                background: "green",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    doc._id,
                                                    "REJECTED"
                                                )
                                            }
                                            style={{
                                                background: "red",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            Reject
                                        </button>

                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>

    );

};

export default UpdateDoucmentstatus;