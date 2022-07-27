const bcrypt = require('bcryptjs');
const hlp = require('../helpers/helpers');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const constant = require('../../config/constant');

const tsuratmasuk = sequelize.define('suratmasuk',{
    surat_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    no_surat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tanggal_surat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isi_surat:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    file:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tampil:{
        type:DataTypes.STRING,
        allowNull:false
    }
})


module.exports={tsuratmasuk};