//file added in Assignment 2

const validateEmployeeData = (req, res, next) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

    // Check if all required fields are present
    if (!first_name || !last_name || !email || !position || !salary || !date_of_joining || !department) {
        return res.status(400).json({
            status: false,
            message: "All fields are required: first_name, last_name, email, position, salary, date_of_joining, department."
        });
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA10-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            status: false,
            message: "Invalid email format."
        });
    }

    // Validate salary (must be a valid number)
    if (isNaN(salary)) {
        return res.status(400).json({
            status: false,
            message: "Salary must be a valid number."
        });
    }

    // Validate date_of_joining (must be a valid date)
    if (isNaN(Date.parse(date_of_joining))) {
        return res.status(400).json({
            status: false,
            message: "Invalid date_of_joining format."
        });
    }

    // Proceed to the next middleware or route handler if valid
    next();
};

// Export the middleware
module.exports = { validateEmployeeData };
