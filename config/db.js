const Sequelize = require('sequelize');
require('dotenv').config();

let databaseName;

if (process.env.NODE_ENV === 'test') {
    databaseName = 'personal_finances_test';
} else {
    databaseName = 'personal_finances';
}

const sequelize = new Sequelize(databaseName, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
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