const bcrypt = require('bcryptjs');
const hlp = require('../helpers/helpers');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const constant = require('../../config/constant');

const taksesaplikasi = sequelize.define('aksesaplikasis',{
    id_akses:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    nm_lengkap:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nohandphone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    akses:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type : DataTypes.STRING,
        allowNull:false
    }
},{
    indexes: [
        // Create a unique index on email
        {
            unique: true,
            fields: ['email']
        }],
});

async function akses_get(vars){
    let data = {
        raw: true,
        where: {}
    };
    ('opt_select' in vars) ? data.attributes = vars.opt_select : null;
    ('opt_groupby' in vars) ? data.group = vars.opt_groupby : null;
    ('opt_orderby' in vars) ? data.order = vars.opt_orderby : null;
    ('opt_where' in vars) ? data.where = vars.opt_where : null;

    // ('userId' in vars) ? data.where.userId = vars.userId : null;
    // ('email' in vars) ? data.where.email = vars.moduleId : null;
    let result = await taksesaplikasi.findAll(data);
    return result;
}
async function akses_add(vars){
    let datainsert={};
    ('nm_lengkap' in vars) ? datainsert.nm_lengkap = vars.nm_lengkap : null;
    ('username' in vars) ? datainsert.username = vars.username:null;
    ('status' in vars) ? datainsert.status = vars.status : null;
    ('nohandphone' in vars) ? datainsert.nohandphone = vars.nohandphone : null;
    ('email' in vars) ? datainsert.email = vars.email : null;
    ('akses' in vars) ? datainsert.akses = vars.akses : null;
    ('password' in vars) ? datainsert.password = vars.password:null;
    if(hlp.ObjNotEmpty(datainsert))
        return await taksesaplikasi.create(datainsert);
}
module.exports={taksesaplikasi,akses_get,akses_add};