import express from "express";

import {
    registerEmployee,
    getEmployees,
    getEmployeeById,
    deleteEmployee
}
from "../controllers/employeeController.js";

const router = express.Router();

router.post("/register",registerEmployee);

router.get("/",getEmployees);

router.get("/:id",getEmployeeById);

router.delete("/:id",deleteEmployee);

export default router;