USE employee_training_db;

-- ============================================
-- Employee API - Important SQL Queries
-- ============================================


-- 1. Get all employees
SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    e.department_id,
    d.name AS department,
    e.date_of_joining,
    e.is_active,
    e.profile_photo,
    e.created_at
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id
ORDER BY e.id ASC;


-- 2. Get employees by department and active status
SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    e.department_id,
    d.name AS department,
    e.date_of_joining,
    e.is_active,
    e.profile_photo,
    e.created_at
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id
WHERE d.name = 'Information Technology'
  AND e.is_active = 1
ORDER BY e.id ASC
LIMIT 10 OFFSET 0;


-- 3. Search employees by name or email
SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    e.department_id,
    d.name AS department,
    e.date_of_joining,
    e.is_active,
    e.profile_photo,
    e.created_at
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id
WHERE e.first_name LIKE '%Nimal%'
   OR e.last_name LIKE '%Nimal%'
   OR e.email LIKE '%Nimal%';


-- 4. Get employee by ID
SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    e.department_id,
    d.name AS department,
    e.date_of_joining,
    e.is_active,
    e.profile_photo,
    e.created_at
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id
WHERE e.id = 2;


-- 5. Create an employee
INSERT INTO employees
(
    first_name,
    last_name,
    email,
    salary,
    department_id,
    date_of_joining,
    is_active,
    profile_photo
)
VALUES
(
    'Example',
    'Employee',
    'example.employee@example.com',
    90000,
    1,
    '2026-09-17',
    1,
    NULL
);


-- 6. Update an employee
UPDATE employees
SET
    first_name = 'Example',
    last_name = 'Employee',
    email = 'example.employee@example.com',
    salary = 95000,
    department_id = 1,
    date_of_joining = '2026-09-17',
    is_active = 1
WHERE id = 2;


-- 7. Update employee salary
UPDATE employees
SET salary = 100000
WHERE id = 2;


-- 8. Update employee active status
UPDATE employees
SET is_active = 0
WHERE id = 2;


-- 9. Delete an employee
DELETE FROM employees
WHERE id = 2;


-- 10. Part 17 - EXPLAIN before/after optimization
EXPLAIN
SELECT
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.salary,
    e.department_id,
    d.name AS department,
    e.date_of_joining,
    e.is_active,
    e.profile_photo,
    e.created_at
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id
WHERE d.name = 'Information Technology'
  AND e.is_active = 1
ORDER BY e.id ASC
LIMIT 10 OFFSET 0;


-- 11. Check department indexes
SHOW INDEX FROM departments;


-- 12. Check employee indexes
SHOW INDEX FROM employees;