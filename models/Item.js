const Sequelize = require('sequelize');
const { getInstance } = require('../config/db');
const User = require('./User');

const sequelize = getInstance();

const Item = sequelize.define('items', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    access_token: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    classMethods: {
        associate: models => {
            Item.belongsTo(models.User);
        }
    }
});

module.exports = Item;