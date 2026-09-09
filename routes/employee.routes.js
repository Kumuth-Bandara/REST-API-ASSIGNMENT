const express = require('express');
const employeeController = require('../controller/employee.controller');

const router = express.Router();

router.get('/employees', employeeController.getEmployees);

module.exports = router;