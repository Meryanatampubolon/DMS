const { STRING } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const hlp = require('../helpers/helpers');

const vDepartemen = sequelize.define('view_departemen', {
    departemenId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    departemen: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    departemenParentId: DataTypes.INTEGER,
    subDepartemen: DataTypes.STRING,
},
    {
        freezeTableName: true,
        indexes: [
            {
                fields: ['userId', 'departemenId', 'departemenParentId']
            }],
    });

const vDepartemen2 = sequelize.define('view_departemen2', {
    subDepartemenId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    departemen: DataTypes.STRING,
    subDepartemen: DataTypes.STRING,
    subKeterangan: DataTypes.STRING,
},
    {
        freezeTableName: true,
    });

const tDepartemen = sequelize.define('departemen', {
    departemenId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    departemen: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    departemenParentId: DataTypes.INTEGER
},
    {
        freezeTableName: true,
        indexes: [
            {
                fields: ['departemenId', 'departemenParentId']
            }],
    }

);

async function departemen_edit(vars) {
    let data = {};
    let vwhere = {};
    ('departemenId' in vars) ? vwhere.departemenId = vars.departemenId : null;
    ('departemen' in vars) ? data.departemen = vars.departemen : null;
    ('keterangan' in vars) ? data.keterangan = vars.keterangan : null;
    ('departemenParentId' in vars) ? data.departemenParentId = vars.departemenParentId : null;

    console.log(data);
    if (hlp.ObjNotEmpty(vwhere)) {
        return await tDepartemen.update(data, { where: vwhere });
    }
}

module.exports = { vDepartemen, vDepartemen2, tDepartemen, departemen_edit };
