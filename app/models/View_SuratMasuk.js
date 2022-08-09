const bcrypt = require('bcryptjs');
const hlp = require('../helpers/helpers');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const constant = require('../../config/constant');



const View_SuratMasuk = sequelize.define('view_suratmasuk',{
    surat_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    no_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    asal_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    tanggal_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    isi_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true
    },
    file:{
        type:DataTypes.STRING,
        allowNull:true
    },
    tampil:{
        type : DataTypes.STRING,
        allowNull:true
    },
    tanggal_masuk:{
        type:DataTypes.STRING,
        allowNull:true
    },
    nama_instansi:{
        type:DataTypes.STRING,
        allowNull:true
    },
    nama_instansi2:{
        type:DataTypes.STRING,
        allowNull:true
    },
    catatan:{
        type:DataTypes.STRING,
        allowNull:true
    },
    proses_surat:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    indexes: [
        {
            unique: true,
            fields: ['no_surat']
        }],
});




async function surat_get(vars){
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
    let result = await View_SuratMasuk.findAll(data);
    console.log(result);
    return result;
}


module.exports={surat_get};




