const employeeService = require('../service/employee.service');

const getEmployees = async (req, res) => {
    try {
        const {
            department,
            search,
            page,
            limit,
            sort,
            order
        } = req.query;

        // Validate page
        if (page !== undefined) {
            if (!Number.isInteger(Number(page)) || Number(page) < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Page must be a positive integer'
                });
            }
        }

        // Validate limit
        if (limit !== undefined) {
            if (!Number.isInteger(Number(limit)) || Number(limit) < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Limit must be a positive integer'
                });
            }
        }

        // Validate order
        if (order !== undefined) {
            if (!['asc', 'desc'].includes(order.toLowerCase())) {
                return res.status(400).json({
                    success: false,
                    message: 'Order must be either ascending or descending'
                });
            }
        }

        // Validate sort field
        const allowedSortFields = [
            'id',
            'name',
            'first_name',
            'last_name',
            'salary',
            'date_of_joining',
            'created_at'
        ];

        if (sort !== undefined && !allowedSortFields.includes(sort)) {
            return res.status(400).json({
                success: false,
                message: `Invalid sort field. Allowed fields: ${allowedSortFields.join(', ')}`
            });
        }

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


const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Employee retrieved successfully',
            data: {
                employee
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to retrieve employee',
            error: error.message
        });
    }
};

const createEmployee = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            salary,
            department_id,
            date_of_joining,
            is_active
        } = req.body;

        // Required field validation
        if (
            !first_name ||
            !last_name ||
            !email ||
            salary === undefined ||
            !department_id ||
            !date_of_joining ||
            is_active === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: 'All employee fields are required'
            });
        }

        // Salary validation
        if (Number(salary) < 0) {
            return res.status(400).json({
                success: false,
                message: 'Salary cannot be negative'
            });
        }

        const employee = await employeeService.createEmployee(req.body);

        res.status(201).json({
            success: true,
            message: 'Employee created successfully',
            data: {
                employee
            }
        });

    } catch (error) {
        console.error(error);

        // Duplicate email
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create employee',
            error: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            first_name,
            last_name,
            email,
            salary,
            department_id,
            date_of_joining,
            is_active
        } = req.body;

        // Validate required fields
        if (
            !first_name ||
            !last_name ||
            !email ||
            salary === undefined ||
            !department_id ||
            !date_of_joining ||
            is_active === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: 'All employee fields are required'
            });
        }

        if (Number(salary) < 0) {
            return res.status(400).json({
                success: false,
                message: 'Salary cannot be negative'
            });
        }

        // Check employee exists
        const existingEmployee = await employeeService.getEmployeeById(id);

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        await employeeService.updateEmployee(id, req.body);

        // Get updated employee
        const updatedEmployee = await employeeService.getEmployeeById(id);

        res.status(200).json({
            success: true,
            message: 'Employee updated successfully',
            data: {
                employee: updatedEmployee
            }
        });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'Email already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to update employee',
            error: error.message
        });
    }
};

const updateEmployeeSalary = async (req, res) => {
    try {
        const { id } = req.params;
        const { salary } = req.body;

        if (salary === undefined || salary === null) {
            return res.status(400).json({
                success: false,
                message: 'Salary is required'
            });
        }

        if (isNaN(salary) || Number(salary) < 0) {
            return res.status(400).json({
                success: false,
                message: 'Salary must be a valid non-negative number'
            });
        }

        const existingEmployee = await employeeService.getEmployeeById(id);

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        await employeeService.updateEmployeeSalary(id, Number(salary));

        const updatedEmployee = await employeeService.getEmployeeById(id);

        res.status(200).json({
            success: true,
            message: 'Employee salary updated successfully',
            data: {
                employee: updatedEmployee
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to update employee salary',
            error: error.message
        });
    }
};

const updateEmployeeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;

        if (is_active === undefined || is_active === null) {
            return res.status(400).json({
                success: false,
                message: 'is_active is required'
            });
        }

        if (Number(is_active) !== 0 && Number(is_active) !== 1) {
            return res.status(400).json({
                success: false,
                message: 'is_active must be 0 or 1'
            });
        }

        const existingEmployee = await employeeService.getEmployeeById(id);

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        await employeeService.updateEmployeeStatus(
            id,
            Number(is_active)
        );

        const updatedEmployee =
            await employeeService.getEmployeeById(id);

        res.status(200).json({
            success: true,
            message: 'Employee status updated successfully',
            data: {
                employee: updatedEmployee
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to update employee status',
            error: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const existingEmployee = await employeeService.getEmployeeById(id);

        if (!existingEmployee) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        await employeeService.deleteEmployee(id);

        res.status(200).json({
            success: true,
            message: 'Employee deleted successfully',
            data: {
                employee: existingEmployee
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Failed to delete employee',
            error: error.message
        });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    updateEmployeeSalary,
    updateEmployeeStatus,
    deleteEmployee
};