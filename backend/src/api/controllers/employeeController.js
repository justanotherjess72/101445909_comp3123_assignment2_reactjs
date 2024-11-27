const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error: " + error.message,
        });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    try {
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department,
        });
        await newEmployee.save();
        res.status(201).json({
            message: "Employee created successfully.",
            employee_id: newEmployee._id,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error creating employee: " + error.message,
        });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found.",
            });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error: " + error.message,
        });
    }
};

// Update employee details
exports.updateEmployee = async (req, res) => {
    const { eid } = req.params;
    const updateData = req.body;

    try {
        const employee = await Employee.findByIdAndUpdate(eid, updateData, { new: true });
        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found.",
            });
        }
        res.status(200).json({
            message: "Employee details updated successfully.",
            employee,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Error updating employee: " + error.message,
        });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findByIdAndDelete(eid);
        if (!employee) {
            return res.status(404).json({
                status: false,
                message: "Employee not found.",
            });
        }
        res.status(204).json({
            message: "Employee deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error: " + error.message,
        });
    }
};

// Search employees -- added in Assignment 2
exports.searchEmployees = async (req, res) => {
    const { query } = req.query; 

    try {
        const employees = await Employee.find({
            $or: [
                { first_name: new RegExp(query, 'i') },
                { last_name: new RegExp(query, 'i') },
                { department: new RegExp(query, 'i') },
                { position: new RegExp(query, 'i') },
            ],
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Server error: " + error.message,
        });
    }
};
