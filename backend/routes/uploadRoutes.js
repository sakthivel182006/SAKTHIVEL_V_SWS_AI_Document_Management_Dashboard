import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import {

    uploadDocument,

    getAllDocuments,

    getDocumentById,

    getDocumentsByUser,

    updateDocumentStatus,

    deleteDocument

} from "../controllers/uploadController.js";

const router = express.Router();

router.post(
    "/",
    upload.array("document", 20),
    uploadDocument
);

router.get(
    "/",
    getAllDocuments
);

router.get(
    "/:id",
    getDocumentById
);

router.get(
    "/user/:userId",
    getDocumentsByUser
);

router.put(
    "/status/:id",
    updateDocumentStatus
);

router.delete(
    "/:id",
    deleteDocument
);

export default router;