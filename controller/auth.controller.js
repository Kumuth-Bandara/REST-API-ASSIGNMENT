const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { username, password } = req.body;

    // Demo credentials
    if (username !== 'admin' || password !== 'admin123') {
        return res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }

    const token = jwt.sign(
        {
            userId: 1,
            username: 'admin'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
            token
        }
    });
};

module.exports = {
    login
};