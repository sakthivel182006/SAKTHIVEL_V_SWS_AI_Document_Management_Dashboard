import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {
    uploadDocument,
    getAllDocuments
} from "../controllers/uploadController.js";

const router = express.Router();

// Upload Documents
router.post(
    "/",
    upload.array(
        "document",
        20
    ),
    uploadDocument
);

// Get All Documents
router.get(
    "/",
    getAllDocuments
);

export default router;