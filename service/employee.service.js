const db = require('../config/database');

const getAllEmployees = async (filters) => {
    const {
        department,
        status,
        search,
        page,
        limit,
        sort,
        order
    } = filters;

    let sql = `
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
        WHERE 1 = 1
    `;

    const params = [];

    if (department) {
        sql += ` AND d.name = ?`;
        params.push(department);
    }

    if (status) {
        sql += ` AND e.is_active = ?`;

        params.push(
            status.toLowerCase() === 'active' ? 1 : 0
        );
    }

    if (search) {
        sql += `
            AND (
                e.first_name LIKE ?
                OR e.last_name LIKE ?
                OR e.email LIKE ?
            )
        `;

        const searchValue = `%${search}%`;

        params.push(searchValue);
        params.push(searchValue);
        params.push(searchValue);
    }

    const allowedSortFields = {
        id: 'e.id',
        name: 'd.name',
        first_name: 'e.first_name',
        last_name: 'e.last_name',
        salary: 'e.salary',
        date_of_joining: 'e.date_of_joining',
        created_at: 'e.created_at'
    };

    const sortField = allowedSortFields[sort] || 'e.id';

    const sortOrder = order && order.toUpperCase() === 'DESC'
        ? 'DESC'
        : 'ASC';

    sql += ` ORDER BY ${sortField} ${sortOrder}`;

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    sql += ` LIMIT ? OFFSET ?`;

    params.push(limitNumber);
    params.push(offset);

    const [rows] = await db.query(sql, params);

    return rows;
};


// Get one employee by ID
const getEmployeeById = async (id) => {
    const sql = `
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
        WHERE e.id = ?
    `;

    const [rows] = await db.query(sql, [id]);

    return rows[0];
};


const createEmployee = async (employee) => {
    const {
        first_name,
        last_name,
        email,
        salary,
        department_id,
        date_of_joining,
        is_active,
        profile_photo
    } = employee;

    const sql = `
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
        first_name,
        last_name,
        email,
        salary,
        department_id,
        date_of_joining,
        is_active,
        profile_photo || null
    ]);

    return {
        id: result.insertId,
        first_name,
        last_name,
        email,
        salary,
        department_id,
        date_of_joining,
        is_active,
        profile_photo: profile_photo || null
    };
};

const updateEmployee = async (id, employee) => {
    const {
        first_name,
        last_name,
        email,
        salary,
        department_id,
        date_of_joining,
        is_active
    } = employee;

    const sql = `
        UPDATE employees
        SET
            first_name = ?,
            last_name = ?,
            email = ?,
            salary = ?,
            department_id = ?,
            date_of_joining = ?,
            is_active = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [
        first_name,
        last_name,
        email,
        salary,
        department_id,
        date_of_joining,
        is_active,
        id
    ]);

    return result;
};

const updateEmployeeSalary = async (id, salary) => {
    const sql = `
        UPDATE employees
        SET salary = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [salary, id]);

    return result;
};

const updateEmployeeStatus = async (id, is_active) => {
    const sql = `
        UPDATE employees
        SET is_active = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [is_active, id]);

    return result;
};

const updateEmployeePhoto = async (id, profile_photo) => {
    const sql = `
        UPDATE employees
        SET profile_photo = ?
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [profile_photo, id]);

    return result;
};

const deleteEmployee = async (id) => {
    const sql = `
        DELETE FROM employees
        WHERE id = ?
    `;

    const [result] = await db.query(sql, [id]);

    return result;
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    updateEmployeeSalary,
    updateEmployeeStatus,
    deleteEmployee,
    updateEmployeePhoto
};