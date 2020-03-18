const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    salt: Sequelize.STRING,
    provider: Sequelize.STRING
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    instanceMethods: {
        toJSON: () => {
            const values = Object.assign({}, this.get());

            delete values.password;
            delete values.salt;
            return values;
        }
    },
    getterMethods: {
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        jwt() {
            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 60);

            return jwt.sign({
                email: this.email,
                id: this.id,
                fullName: this.fullName,
                exp: parseInt(expirationDate.getTime() / 1000, 10)
            }, 'secret');
        }
    },
    setterMethods: {
        fullName(value) {
            const names = value.split(' ');

            this.setDataValue('firstName', names.slice(0, -1).join(' '));
            this.setDataValue('lastName', names.slice(-1).join(' '));
        },
        password(value) {
            const salt = bcrypt.genSaltSync(10);
            this.setDataValue('salt', salt);
            const hashedPassword = bcrypt.hashSync(value, salt);

            this.setDataValue('password', hashedPassword);
        }
    }
});

module.exports = User;