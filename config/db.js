const Sequelize = require('sequelize');
require('dotenv').config();

const host = 'personal-finances-test.cobpu0yl0hux.us-east-2.rds.amazonaws.com';
const password = 'personal-finances';

if (process.env.NODE_ENV === 'test') {
    databaseName = 'personal-finances-test';
} else {
    databaseName = 'personal-finances-dev';
}

const sequelize = new Sequelize(databaseName, 'root', password, {
    host: host,
    dialect: 'mysql',
    port: 3306,
    logging: console.log,
    dialectOptions: {
        ssl: 'Amazon RDS'
    },
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: 'en'
});

async function connectDb() {
    try {
        await sequelize.authenticate();
        console.log('Database connection successfully established');
    } catch (err) {
        console.error('Unable to connect to database: ', err);
    }
}

module.exports = { sequelize, connectDb };