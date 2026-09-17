-- Part 17: API Performance Optimization

-- The employee list API filters employees by department name.
-- Before optimization, departments.name had no index.
-- EXPLAIN showed a full table scan on the departments table.
-- This index allows MySQL to find the matching department
-- more efficiently.

CREATE INDEX idx_departments_name
ON departments(name);