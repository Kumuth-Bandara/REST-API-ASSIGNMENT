const upload = require('../middleware/upload.middleware');

const authController = require('../controller/auth.controller');

const authenticateToken = require('../middleware/auth.middleware');

const express = require('express');

const employeeController = require('../controller/employee.controller');

const router = express.Router();

router.post('/login', authController.login);

router.get('/employees', employeeController.getEmployees);

router.get('/employees/:id', employeeController.getEmployeeById);

router.post('/employees/:id/photo',authenticateToken,upload.single('photo'),employeeController.uploadEmployeePhoto);

router.post('/employees',authenticateToken,upload.single('profile_photo'),employeeController.createEmployee);

router.put('/employees/:id',authenticateToken,employeeController.updateEmployee);

router.patch('/employees/:id/salary',authenticateToken,employeeController.updateEmployeeSalary);

router.patch('/employees/:id/status',authenticateToken,employeeController.updateEmployeeStatus);

router.delete('/employees/:id',authenticateToken,employeeController.deleteEmployee);

module.exports = router;