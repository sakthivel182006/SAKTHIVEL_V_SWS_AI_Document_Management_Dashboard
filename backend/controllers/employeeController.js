import Employee from "../models/Employee.js";

export const registerEmployee = async(req,res)=>{
    try
    {
        const {name,email,password,role} = req.body;

        const existingEmployee = await Employee.findOne({email});

        if(existingEmployee)
        {
            return res.status(400).json({
                message:"Email already exists"
            });
        }

        const employee = await Employee.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success:true,
            employee
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

export const getEmployees = async(req,res)=>{
    try
    {
        const employees = await Employee.find();

        res.status(200).json(employees);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
};

export const getEmployeeById = async(req,res)=>{
    try
    {
        const employee = await Employee.findById(req.params.id);

        if(!employee)
        {
            return res.status(404).json({
                message:"Employee not found"
            });
        }

        res.status(200).json(employee);
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
};

export const deleteEmployee = async(req,res)=>{
    try
    {
        await Employee.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Employee deleted successfully"
        });
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
};