const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Instansi = sequelize.define('instansi', {
    instansi: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    freezeTableName: true
  });

module.exports = Instansi;