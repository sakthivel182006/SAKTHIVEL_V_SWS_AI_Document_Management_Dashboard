import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
{
    fileName: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number
    },

    fileType: {
        type: String
    },

    filePath: {
        type: String
    },

    uploadedBy: {
        type: String
    },

    status: {
        type: String,
        enum: [
            "UNDER_VERIFICATION",
            "APPROVED",
            "REJECTED"
        ],
        default: "UNDER_VERIFICATION"
    },

    uploadedDate: {
        type: Date,
        default: Date.now
    },

    reviewedDate: {
        type: Date
    }
},
{
    timestamps: true
}
);

export default mongoose.model(
    "Document",
    documentSchema
);