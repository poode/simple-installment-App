const path = require('path');

const dbStorage = path.resolve(__dirname, '../installment_db.sqlite');

const dbConfig = {
    development: {
        username: 'admin',
        password: '123456',
        database: 'installment_db',
        host: '127.0.0.1',
        storage: dbStorage,
        dialect: 'sqlite',
        logging: console.log,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        storage: process.env.DB_STORAGE || dbStorage,
        dialect: 'sqlite',
        logging: console.log,
    },
};

module.exports = dbConfig[process.env.NODE_ENV || 'development'];
