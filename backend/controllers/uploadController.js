import Document from "../models/Document.js";


// Upload Document

export const uploadDocument = async (req, res) => {

    try {

        const uploadedFiles = [];

        for (const file of req.files) {

            const document =
                await Document.create({

                    fileName:
                        file.originalname,

                    fileSize:
                        file.size,

                    fileType:
                        file.mimetype,

                    filePath:
                        file.path,

                    uploadedBy:
                        req.body.userId || null,

                    status:
                        "UNDER_VERIFICATION",

                    uploadedDate:
                        new Date()

                });

            uploadedFiles.push(document);

        }

        res.status(201).json({

            success: true,

            message:
                "Documents uploaded successfully",

            documents:
                uploadedFiles

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// Get All Documents

export const getAllDocuments = async (req, res) => {

    try {

        const documents =
            await Document.find()
                .sort({
                    createdAt: -1
                });

        res.status(200).json({

            success: true,

            documents

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// Get Single Document

export const getDocumentById = async (req, res) => {

    try {

        const document =
            await Document.findById(
                req.params.id
            );

        if (!document) {

            return res.status(404).json({

                success: false,

                message:
                    "Document not found"

            });

        }

        res.status(200).json({

            success: true,

            document

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// Get Documents By User

export const getDocumentsByUser = async (req, res) => {

    try {

        const documents =
            await Document.find({

                uploadedBy:
                    req.params.userId

            });

        res.status(200).json({

            success: true,

            documents

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};


// Update Status




export const updateDocumentStatus = async (req, res) => {

    try {

        const { status } = req.body;

        console.log("Document ID:", req.params.id);
        console.log("New Status:", status);

        const document =
            await Document.findByIdAndUpdate(

                req.params.id,

                {
                    status: status,
                    reviewedDate: new Date()
                },

                {
                    new: true,
                    runValidators: true
                }

            );

        if (!document) {

            return res.status(404).json({
                success: false,
                message: "Document not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            document
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// Delete Document

export const deleteDocument = async (req, res) => {

    try {

        const document =
            await Document.findByIdAndDelete(
                req.params.id
            );

        if (!document) {

            return res.status(404).json({

                success: false,

                message:
                    "Document not found"

            });

        }

        res.status(200).json({

            success: true,

            message:
                "Document deleted successfully"

        });

    }
    catch (error) {

        res.status(500).json({

            success: false,

            message:
                error.message

        });

    }

};