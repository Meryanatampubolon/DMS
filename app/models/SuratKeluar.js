const bcrypt = require('bcryptjs');
const hlp = require('../helpers/helpers');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const constant = require('../../config/constant');



const SuratKeluar = sequelize.define('suratkeluar',{
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
    no_agenda:{
        type:DataTypes.STRING,
        allowNull:true
    },
    kode_klasifikasi:{
        type:DataTypes.STRING,
        allowNull:true
    },
    tanggal_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    tanggal_Diterima:{
        type:DataTypes.STRING,
        allowNull:true
    },
    tujuan:{
        type:DataTypes.STRING,
        allowNull:true
    },
    Isi_surat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    file:{
        type:DataTypes.STRING,
        allowNull:true
    },
    catatan:{
        type : DataTypes.STRING,
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


async function Suratkeluar_add(vars){

    let datainsert={};
    ('no_surat' in vars) ? datainsert.no_surat = vars.no_surat : null;
    ('nama_instansi' in vars) ? datainsert.nama_instansi = vars.nama_instansi:null;
    ('tanggal_masuk' in vars) ? datainsert.tanggal_masuk = vars.tanggal_masuk : null;
    ('tanggal_surat' in vars) ? datainsert.tanggal_surat = vars.tanggal_surat : null;
    ('nama_instansi2' in vars) ? datainsert.nama_instansi2 = vars.nama_instansi2 : null;
    ('catatan' in vars) ? datainsert.catatan = vars.catatan : null;
    ('isi_surat' in vars) ? datainsert.isi_surat = vars.isi_surat:null;
    ('proses_surat' in vars) ? datainsert.proses_surat = vars.proses_surat:null;
    console.log(datainsert);
    if(hlp.ObjNotEmpty(datainsert))
        return await SuratKeluar.create(datainsert);
}

async function Suratkeluar_edit(vars) {
    let data = {};
    let vwhere = {};
    ('surat_id' in vars) ? vwhere.userId = vars.surat_id : null;
    ('no_surat' in vars) ? datainsert.no_surat = vars.no_surat : null;
    ('nama_instansi' in vars) ? datainsert.nama_instansi = vars.nama_instansi:null;
    ('tanggal_masuk' in vars) ? datainsert.tanggal_masuk = vars.tanggal_masuk : null;
    ('tanggal_surat' in vars) ? datainsert.tanggal_surat = vars.tanggal_surat : null;
    ('nama_instansi2' in vars) ? datainsert.nama_instansi2 = vars.nama_instansi2 : null;
    ('catatan' in vars) ? datainsert.catatan = vars.catatan : null;
    ('isi_surat' in vars) ? datainsert.isi_surat = vars.isi_surat:null;
    ('proses_surat' in vars) ? datainsert.proses_surat = vars.proses_surat:null;
    if (hlp.ObjNotEmpty(vwhere)) {
        return await SuratKeluar.update(data, { where: vwhere });
    }
}


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
    let result = await SuratKeluar.findAll(data);
    console.log(result);
    return result;
}

async function suratkeluar_delete(vars) {
    let data = {};
    ('surat_id' in vars) ? data.userId = vars.surat_id : null;
    if (hlp.ObjNotEmpty(data)) {
        return await SuratKeluar.destroy({ where: data });
    }
}

module.exports={Suratkeluar_add,SuratKeluar, surat_get, suratkeluar_delete, Suratkeluar_edit};




