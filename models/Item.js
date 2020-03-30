const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

const Item = sequelize.define('items', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    access_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    item_id: {
        type: Sequelize.STRING,
        allowNull: false
    }
});