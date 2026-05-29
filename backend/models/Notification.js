import mongoose from "mongoose";

const notificationSchema =
new mongoose.Schema(
{
    message:
    {
        type:String,
        required:true
    },

    type:
    {
        type:String,
        enum:[
            "success",
            "error",
            "info"
        ],
        default:"info"
    },

    read:
    {
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
}
);

export default mongoose.model(
    "Notification",
    notificationSchema
);