export const documentUploadedTemplate =
(
    fileName
) => {

    return `

    <h2>Document Uploaded</h2>

    <p>
        Your document
        <strong>${fileName}</strong>
        has been uploaded successfully.
    </p>

    <p>
        Current Status:
        UNDER_VERIFICATION
    </p>

    `;

};

export const documentStatusTemplate =
(
    fileName,
    status
) => {

    return `

    <h2>Document Status Updated</h2>

    <p>

        Your document

        <strong>
            ${fileName}
        </strong>

        status has been updated.

    </p>

    <h3>

        New Status :
        ${status}

    </h3>

    `;

};