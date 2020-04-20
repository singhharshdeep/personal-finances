const Sequelize = require('sequelize');
require('dotenv').config();

const host = '34.68.191.126';
const password = 'root';

if (process.env.NODE_ENV === 'test') {
    databaseName = 'personalfinancestest';
} else {
    databaseName = 'personalfinancesdev';
}

let sequelize;

function getInstance() {
    if (!sequelize) {
        sequelize = getConnection();
    }
    return sequelize;
}

function getConnection() {
    return new Sequelize(databaseName, 'root', password, {
        host: host,
        dialect: 'mysql',
        port: 3306,
        logging: console.log,
        language: 'en'
    });
}

async function connectDb() {
    try {
        getInstance();
        await sequelize.authenticate();
        console.log('Database connection successfully established');
    } catch (err) {
        console.error('Unable to connect to database: ', err);
    }
}

module.exports = { getInstance, connectDb };