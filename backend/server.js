import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import employeeRoutes from "./routes/employeeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// Static Upload Folder
app.use(
    "/uploads",
    express.static("uploads")
);

// Employee APIs
app.use(
    "/api/employees",
    employeeRoutes
);

// Document APIs
app.use(
    "/api/upload",
    uploadRoutes
);

// Notification APIs
app.use(
    "/api/notifications",
    notificationRoutes
);

// Health Check
app.get(
    "/",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Document Management Backend Running"

        });

    }
);

// 404 Handler
app.use((req, res) => {

    res.status(404).json({

        success: false,

        message:
            "Route Not Found"

    });

});

// Start Server
const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});