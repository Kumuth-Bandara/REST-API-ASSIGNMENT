const employeeService = require('../service/employee.service');

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees(req.query);

        res.status(200).json({
            success: true,
            message: 'Employees retrieved successfully',
            data: employees
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve employees',
            error: error.message
        });
    }
};

module.exports = {
    getEmployees
};