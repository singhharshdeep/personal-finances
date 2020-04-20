const { connectDb, getInstance } = require('../config/db');

const sequelize = getInstance();

exports.connectTestDb = async () => {
    console.log('Connecting to Test Database...');
    await connectDb();
}

exports.closeDbConnection = async () => {
    await sequelize.close();
    console.log('Database connection closed');
}