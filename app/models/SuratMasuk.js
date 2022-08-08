const bcrypt = require('bcryptjs');
const hlp = require('../helpers/helpers');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const constant = require('../../config/constant');
const Session = require('../models/Session');


const SuratMasuk = sequelize.define('suratmasuk',{
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
    },
    Disposisi:{
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


async function Suratmasuk_add(vars){

    let datainsert={};
    ('no_surat' in vars) ? datainsert.no_surat = vars.no_surat : null;
    ('nama_instansi' in vars) ? datainsert.nama_instansi = vars.nama_instansi:null;
    ('tanggal_masuk' in vars) ? datainsert.tanggal_masuk = vars.tanggal_masuk : null;
    ('tanggal_surat' in vars) ? datainsert.tanggal_surat = vars.tanggal_surat : null;
    ('nama_instansi2' in vars) ? datainsert.nama_instansi2 = vars.nama_instansi2 : null;
    ('catatan' in vars) ? datainsert.catatan = vars.catatan : null;
    ('isi_surat' in vars) ? datainsert.isi_surat = vars.isi_surat:null;
    ('proses_surat' in vars) ? datainsert.proses_surat = vars.proses_surat:null;
    ('file' in vars) ? datainsert.file = vars.file:null;
    ('Disposisi' in vars) ? datainsert.Disposisi = vars.Disposisi:null;
    console.log(datainsert);
    if(hlp.ObjNotEmpty(datainsert))
        return await SuratMasuk.create(datainsert);
}

async function SuratMasuk_edit(vars) {
    let data = {};
    let vwhere = {};
    ('surat_id' in vars) ? vwhere.surat_id = vars.surat_id : null;
    ('no_surat' in vars) ? data.no_surat = vars.no_surat : null;
    ('tanggal_masuk' in vars) ? data.tanggal_masuk = vars.tanggal_masuk : null;
    ('tanggal_surat' in vars) ? data.tanggal_surat = vars.tanggal_surat : null;
    ('nama_instansi2' in vars) ? data.nama_instansi2 = vars.nama_instansi2 : null;
    ('catatan' in vars) ? data.catatan = vars.catatan : null;
    ('isi_surat' in vars) ? data.isi_surat = vars.isi_surat:null;
    ('proses_surat' in vars) ? data.proses_surat = vars.proses_surat:null;
    ('nama_instansi' in vars) ? data.nama_instansi = vars.nama_instansi : null;
    ('status' in vars) ? data.status = vars.status : null;
    if (hlp.ObjNotEmpty(vwhere)) {
        return await SuratMasuk.update(data, { where: vwhere });
    }
}

async function SuratMasuk_edit_detail(vars) {
    let data = {};
    let vwhere = {};
    ('surat_id' in vars) ? vwhere.surat_id = vars.surat_id : null;
    ('status' in vars) ? data.status = vars.status : null;
    console.log(vwhere);
    if (hlp.ObjNotEmpty(vwhere)) {
        return await SuratMasuk.update(data, { where: vwhere });
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
    let result = await SuratMasuk.findAll(data);
    // console.log(result);
    // console.log(Session.userId);
    return result;
}

async function suratmasuk_delete(vars) {
    let data = {};
    ('surat_id' in vars) ? data.userId = vars.surat_id : null;
    if (hlp.ObjNotEmpty(data)) {
        return await SuratMasuk.destroy({ where: data });
    }
}

module.exports={Suratmasuk_add,SuratMasuk, surat_get, suratmasuk_delete, SuratMasuk_edit, SuratMasuk_edit_detail};




