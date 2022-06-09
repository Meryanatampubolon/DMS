const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const UserModule = sequelize.define('userModules', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    moduleId: DataTypes.INTEGER,
},
    {
        indexes: [
            // Create a unique index on email
            {
                fields: ['userId', 'moduleId']
            }],
    });

module.exports = UserModule;