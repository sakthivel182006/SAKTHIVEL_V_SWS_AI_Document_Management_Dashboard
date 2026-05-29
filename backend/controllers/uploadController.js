import Document from "../models/Document.js";

export const uploadDocument =
async (req,res)=>{

    try
    {

        const uploadedFiles = [];

        for(
            const file
            of req.files
        )
        {

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
                req.body.userId || null

            });

            uploadedFiles.push(
                document
            );

        }

        res.status(201).json({

            success:true,

            message:
            "Documents uploaded successfully",

            documents:
            uploadedFiles

        });

    }
    catch(error)
    {

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};


export const getAllDocuments = async (req, res) => {

    try {

        const documents = await Document.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            documents
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

