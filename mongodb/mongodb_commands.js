// MongoDB Employee Training Database

use employee_training;

// Create employees collection
db.createCollection("employees");

// Insert employee documents
db.employees.insertMany([
    {
        firstName: "Kamal",
        lastName: "Perera",
        email: "kamal@example.com",
        salary: 85000,
        department: "Human Resources",
        dateOfJoining: "2024-01-15",
        isActive: true,
        skills: ["Recruitment", "Communication"]
    },
    {
        firstName: "Nimal",
        lastName: "Fernando",
        email: "nimal@example.com",
        salary: 92000,
        department: "Information Technology",
        dateOfJoining: "2023-06-20",
        isActive: true,
        skills: ["Python", "JavaScript", "SQL"]
    },
    {
        firstName: "Sahan",
        lastName: "Bandara",
        email: "sahan@example.com",
        salary: 78000,
        department: "Information Technology",
        dateOfJoining: "2024-02-10",
        isActive: true,
        skills: ["Java", "SQL"]
    },
    {
        firstName: "Ruwan",
        lastName: "Wijesinghe",
        email: "ruwan@example.com",
        salary: 120000,
        department: "Finance",
        dateOfJoining: "2022-08-01",
        isActive: true,
        skills: ["Accounting", "Excel"]
    },
    {
        firstName: "Pasindu",
        lastName: "De Silva",
        email: "pasindu@example.com",
        salary: 75000,
        department: "Sales",
        dateOfJoining: "2025-01-10",
        isActive: true,
        skills: ["Sales", "Communication"]
    },
    {
        firstName: "Gihan",
        lastName: "Karunaratne",
        email: "gihan@example.com",
        salary: 100000,
        department: "Operations",
        dateOfJoining: "2023-09-12",
        isActive: true,
        skills: ["Operations", "Management"]
    }
]);


// 1. Display all employees
db.employees.find();


// 2. Find employees by department
db.employees.find({
    department: "Information Technology"
});


// 3. Find active employees
db.employees.find({
    isActive: true
});


// 4. Find employees with salary greater than 90,000
db.employees.find({
    salary: { $gt: 90000 }
});


// 5. Find employees with Python skill
db.employees.find({
    skills: "Python"
});


// 6. Sort employees by salary in descending order
db.employees.find().sort({
    salary: -1
});


// 7. Count employees in Information Technology
db.employees.countDocuments({
    department: "Information Technology"
});


// 8. Create an index on email
db.employees.createIndex({
    email: 1
});


// 9. Create a compound index for department and active status
db.employees.createIndex({
    department: 1,
    isActive: 1
});


// 10. Display all indexes
db.employees.getIndexes();


// 11. Analyze a query using the compound index
db.employees.find({
    department: "Information Technology",
    isActive: true
}).explain("executionStats");