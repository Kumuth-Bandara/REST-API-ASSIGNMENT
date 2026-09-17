const upload = require('../middleware/upload.middleware');

const authController = require('../controller/auth.controller');

const authenticateToken = require('../middleware/auth.middleware');

const express = require('express');

const employeeController = require('../controller/employee.controller');

const router = express.Router();

 /**
  * @swagger
  * /api/login:
  *   post:
  *     summary: User login
  *     tags:
  *       - Authentication
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - username
  *               - password
  *             properties:
  *               username:
  *                 type: string
  *                 example: admin
  *               password:
  *                 type: string
  *                 format: password
  *                 example: admin123
  *     responses:
  *       200:
  *         description: Login successful
  *       401:
  *         description: Invalid username or password
  */
 router.post('/login', authController.login);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter employees by department name
 *         example: Information Technology
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - active
 *             - inactive
 *         description: Filter employees by active status
 *         example: active
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of employees per page
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search employees by name or email
 *         example: Nimal
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - id
 *             - name
 *             - first_name
 *             - last_name
 *             - salary
 *             - date_of_joining
 *             - created_at
 *         description: Field to sort by
 *         example: salary
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - ASC
 *             - DESC
 *         description: Sorting order
 *         example: DESC
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get('/employees', employeeController.getEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.get('/employees/:id', employeeController.getEmployeeById);

/**
 * @swagger
 * /api/employees/{id}/photo:
 *   post:
 *     summary: Upload an employee profile photo
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 31
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - photo
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *                 description: Employee profile photo (JPG, JPEG or PNG, max 5 MB)
 *     responses:
 *       200:
 *         description: Employee profile photo updated successfully
 *       400:
 *         description: Photo file is missing or invalid
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.post(
    '/employees/:id/photo',
    authenticateToken,
    upload.single('photo'),
    employeeController.uploadEmployeePhoto
);

 /**
  * @swagger
  * /api/employees:
  *   post:
  *     summary: Create a new employee
  *     tags:
  *       - Employees
  *     security:
  *       - bearerAuth: []
  *     requestBody:
  *       required: true
  *       content:
  *         multipart/form-data:
  *           schema:
  *             type: object
  *             required:
  *               - first_name
  *               - last_name
  *               - email
  *               - salary
  *               - department_id
  *               - date_of_joining
  *               - is_active
  *             properties:
  *               first_name:
  *                 type: string
  *                 example: John
  *               last_name:
  *                 type: string
  *                 example: Perera
  *               email:
  *                 type: string
  *                 format: email
  *                 example: john.perera@example.com
  *               salary:
  *                 type: number
  *                 example: 90000
  *               department_id:
  *                 type: integer
  *                 example: 1
  *               date_of_joining:
  *                 type: string
  *                 format: date
  *                 example: 2025-01-15
  *               is_active:
  *                 type: integer
  *                 enum:
  *                   - 0
  *                   - 1
  *                 example: 1
  *               profile_photo:
  *                 type: string
  *                 format: binary
  *                 description: Employee profile photo
  *     responses:
  *       201:
  *         description: Employee created successfully
  *       400:
  *         description: Invalid or missing employee fields
  *       401:
  *         description: Unauthorized
  *       409:
  *         description: Email already exists
  *       500:
  *         description: Internal server error
  */
 router.post('/employees',authenticateToken,upload.single('profile_photo'),employeeController.createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update an employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 31
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - salary
 *               - department_id
 *               - date_of_joining
 *               - is_active
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *               last_name:
 *                 type: string
 *                 example: Perera
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.perera@example.com
 *               salary:
 *                 type: number
 *                 example: 95000
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               date_of_joining:
 *                 type: string
 *                 format: date
 *                 example: 2025-01-15
 *               is_active:
 *                 type: integer
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 1
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid or missing employee fields
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.put('/employees/:id', authenticateToken, employeeController.updateEmployee);

/**
 * @swagger
 * /api/employees/{id}/salary:
 *   patch:
 *     summary: Update an employee's salary
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 31
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salary
 *             properties:
 *               salary:
 *                 type: number
 *                 example: 100000
 *     responses:
 *       200:
 *         description: Employee salary updated successfully
 *       400:
 *         description: Invalid salary
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.patch('/employees/:id/salary', authenticateToken, employeeController.updateEmployeeSalary);

/**
 * @swagger
 * /api/employees/{id}/status:
 *   patch:
 *     summary: Update an employee's active status
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 31
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_active
 *             properties:
 *               is_active:
 *                 type: integer
 *                 enum:
 *                   - 0
 *                   - 1
 *                 example: 0
 *                 description: 1 = Active, 0 = Inactive
 *     responses:
 *       200:
 *         description: Employee status updated successfully
 *       400:
 *         description: Invalid status value
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.patch('/employees/:id/status', authenticateToken, employeeController.updateEmployeeStatus);

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *         example: 31
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
router.delete('/employees/:id', authenticateToken, employeeController.deleteEmployee);

module.exports = router;