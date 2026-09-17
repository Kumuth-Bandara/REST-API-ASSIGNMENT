const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.3',

        info: {
            title: 'Employee API',
            version: '1.0.0',
            description: 'REST API for managing employees'
        },

        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },

            schemas: {
                EmployeeCreate: {
                    type: 'object',
                    required: [
                        'first_name',
                        'last_name',
                        'email',
                        'salary',
                        'department_id',
                        'date_of_joining',
                        'is_active'
                    ],
                    properties: {
                        first_name: {
                            type: 'string',
                            example: 'Nimal'
                        },
                        last_name: {
                            type: 'string',
                            example: 'Fernando'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'nimal.fernando@example.com'
                        },
                        salary: {
                            type: 'number',
                            example: 92000
                        },
                        department_id: {
                            type: 'integer',
                            example: 1
                        },
                        date_of_joining: {
                            type: 'string',
                            format: 'date',
                            example: '2026-09-15'
                        },
                        is_active: {
                            type: 'integer',
                            example: 1
                        }
                    }
                }
            }
        }
    },

    apis: [
        './routes/*.js'
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;