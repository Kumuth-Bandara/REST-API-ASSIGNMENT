const express = require('express');

const employeeController = require('../controller/employee.controller');

const router = express.Router();

router.get('/employees', employeeController.getEmployees);

router.get('/employees/:id', employeeController.getEmployeeById);

router.post('/employees', employeeController.createEmployee);

router.put('/employees/:id', employeeController.updateEmployee);

router.patch('/employees/:id/salary', employeeController.updateEmployeeSalary);

router.patch('/employees/:id/status', employeeController.updateEmployeeStatus);

router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;