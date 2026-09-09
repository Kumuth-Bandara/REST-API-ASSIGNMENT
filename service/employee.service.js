const db = require('../config/database');

const getAllEmployees = async (filters) => {
    const {
        department,
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

    // Department filter
    if (department) {
        sql += ` AND d.name LIKE ?`;
        params.push(`%${department}%`);
    }

    // Search filter
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

    // Sorting
    const allowedSortFields = {
        id: 'e.id',
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

    // Pagination
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const offset = (pageNumber - 1) * limitNumber;

    sql += ` LIMIT ? OFFSET ?`;

    params.push(limitNumber);
    params.push(offset);

    const [rows] = await db.query(sql, params);

    return rows;
};

module.exports = {
    getAllEmployees
};