const { STRING } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const hlp = require('../helpers/helpers');

const vUserDepartemen = sequelize.define('view_userDepartemen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    departemenId: DataTypes.INTEGER,
    departemenName: DataTypes.STRING
},
    {
        indexes: [
            {
                fields: ['userId', 'departemenId']
            }],
    }
);

const tUserDepartemen = sequelize.define('userDepartemen', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: DataTypes.INTEGER,
    departemenId: DataTypes.INTEGER,
},
{
    freezeTableName: true,
    indexes: [
        {
            fields: ['userId', 'departemenId']
        }],
}
);

async function userDepartemen_get(vars) {
    //console.log(vars);
    // ini contoh query builder dengan sequalize
    let data = {
        raw: true,
        where: {}
    };
    ('opt_select' in vars) ? data.attributes = vars.opt_select : null;
    ('opt_groupby' in vars) ? data.group = vars.opt_groupby : null;
    ('opt_orderby' in vars) ? data.order = vars.opt_orderby : null;
    ('opt_where' in vars) ? data.where = vars.opt_where : null;

    ('userId' in vars) ? data.where.userId = vars.userId : null;
    ('departemenId' in vars) ? data.where.departemenId = vars.departemenId : null;
    //console.log(data);
    let result = await vUserDepartemen.findAll(data);
    return result;
}

async function userDepartemen_add(vars) {
    let data = {};
    ('userId' in vars) ? data.userId = vars.userId : null;
    ('departemenId' in vars) ? data.departemenId = vars.departemenId : null;
    if (hlp.ObjNotEmpty(data)) {
        return await tUserDepartemen.create(data);
    }

}

async function userDepartemen_delete(vars) {
    let data = {};
    ('id' in vars) ? data.id = vars.id : null;
    ('userId' in vars) ? data.userId = vars.userId : null;
    ('departemenId' in vars)  ? data.departemenId = vars.departemenId : null;
    if (hlp.ObjNotEmpty(data)) {
        console.log(data);
        return await tUserDepartemen.destroy({ where: data });
    }
}


module.exports = { vUserDepartemen, tUserDepartemen, userDepartemen_get, userDepartemen_add, userDepartemen_delete };