import Notification from "../models/Notification.js";

export const getNotifications =
async(req,res)=>{

    try{

        const notifications =
        await Notification.find()
        .sort({createdAt:-1});

        res.status(200).json({

            success:true,

            notifications

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const markAsRead =
async(req,res)=>{

    try{

        const notification =
        await Notification.findByIdAndUpdate(

            req.params.id,

            {
                read:true
            },

            {
                new:true
            }

        );

        res.status(200).json({

            success:true,

            notification

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const markAllRead =
async(req,res)=>{

    try{

        await Notification.updateMany(

            {},

            {
                read:true
            }

        );

        res.status(200).json({

            success:true,

            message:"All notifications marked as read"

        });

    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};