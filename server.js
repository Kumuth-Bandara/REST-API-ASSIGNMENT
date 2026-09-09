const express = require('express');
const employeeRoutes = require('./routes/employee.routes');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');

const app = express();

app.use(express.json());

app.use(cors());
app.use(express.json());

app.use('/api', employeeRoutes);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Employee API is running'
    });
});

app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 AS result');

        res.json({
            success: true,
            message: 'MySQL connection successful',
            data: rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'MySQL connection failed',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});