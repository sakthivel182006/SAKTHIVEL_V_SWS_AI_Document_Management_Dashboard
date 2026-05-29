import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/employees",employeeRoutes);

app.get("/",(req,res)=>{
    res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server Running On Port ${PORT}`);
});