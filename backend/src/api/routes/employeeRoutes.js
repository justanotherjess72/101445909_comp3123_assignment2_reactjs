const express = require('express');
const employeeController = require('../controllers/employeeController');
//const { validateEmployeeData } = require('../middleware/validationMiddleware'); // Import validation middleware -- added in Assignment 2

const router = express.Router();

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

// Create a new employee - with validation -- updated in Assignment 2
router.post('/employees', validateEmployeeData, employeeController.createEmployee);

// Get employee by ID
router.get('/employees/:eid', employeeController.getEmployeeById);

// Update employee details - with validation -- updated in Assignment 2
router.put('/employees/:eid', validateEmployeeData, employeeController.updateEmployee);

// Delete an employee
router.delete('/employees/:eid', employeeController.deleteEmployee);

// Search employees -- added in Assignment 2
router.get('/employees/search', employeeController.searchEmployees);

module.exports = router;
