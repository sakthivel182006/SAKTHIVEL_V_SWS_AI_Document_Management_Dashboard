import mongoose from "mongoose";

const documentSchema =
new mongoose.Schema(
{
    fileName:
    {
        type:String,
        required:true
    },

    fileSize:
    {
        type:Number
    },

    fileType:
    {
        type:String
    },

    filePath:
    {
        type:String
    },

    uploadedBy:
    {
        type:String
    }
},
{
    timestamps:true
}
);

export default mongoose.model(
    "Document",
    documentSchema
);