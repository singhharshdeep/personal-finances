const Sequelize = require('sequelize');

const sequelize = new Sequelize('personal_finances', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

async function connectDb() {
    try {
        const connection = await sequelize.authenticate();
        console.log('Database connection successfully established');
    } catch (err) {
        console.error('Unable to connect to database: ', err);
    }
}

module.exports = { sequelize, connectDb };