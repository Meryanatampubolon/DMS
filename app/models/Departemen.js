const { STRING } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const hlp = require('../helpers/helpers');

const vDepartemen = sequelize.define('view_userDepartemen', {
    departemenId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    departemenId: DataTypes.INTEGER,
    departemenName: DataTypes.STRING,
    departemenParentId: DataTypes.INTEGER,
    departemenParentName: DataTypes.STRING,
},
    {
        indexes: [
            {
                fields: ['userId', 'departemenId', 'departemenParentId']
            }],
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
    departemenParentId:DataTypes.INTEGER
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
    ('departemenParentID' in vars) ? data.departemenParentID = vars.departemenParentID : null;
    if (hlp.ObjNotEmpty(vwhere)) {
         return await tDepartemen.update(data, { where: vwhere });
    }
}

module.exports = { vDepartemen, tDepartemen, departemen_edit};
