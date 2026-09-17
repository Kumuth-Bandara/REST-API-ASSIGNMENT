CREATE DATABASE IF NOT EXISTS employee_training_db;

USE employee_training_db;

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) DEFAULT NULL,
    department_id INT NOT NULL,
    date_of_joining DATE DEFAULT NULL,
    is_active TINYINT(1) DEFAULT 1,
    profile_photo VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY email (email),

    KEY idx_employees_department_active (department_id, is_active),

    CONSTRAINT employees_ibfk_1
        FOREIGN KEY (department_id)
        REFERENCES departments (id)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- Department data
INSERT INTO departments (id, name, description) VALUES
(1, 'Information Technology', 'IT department'),
(2, 'Human Resources', 'HR department'),
(3, 'Finance', 'Finance department'),
(4, 'Sales', 'Sales department'),
(5, 'Operations', 'Operations department');


-- Employee data
INSERT INTO employees
(first_name, last_name, email, salary, department_id, date_of_joining, is_active, profile_photo)
VALUES
('Nimal', 'Fernando', 'nimal.fernando@example.com', 92000, 1, '2022-06-20', 1, NULL),
('Sahan', 'Bandara', 'sahan.bandara@example.com', 78000, 1, '2024-02-10', 1, NULL),
('Tharindu', 'Silva', 'tharindu.silva@example.com', 105000, 1, '2021-11-05', 1, NULL);