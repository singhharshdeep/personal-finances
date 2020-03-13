const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    provider: Sequelize.STRING
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    getterMethods: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        }
    },
    setterMethods: {
        fullName(value) {
            const names = value.split(' ');

            this.setDataValue('firstName', names.slice(0, -1).join(' '));
            this.setDataValue('lastName', names.slice(-1).join(' '));
        }
    }
});

module.exports = User;