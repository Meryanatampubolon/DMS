const validator = require('validator');
const User = require('../../models/User');
const View_SuratMasuk = require('../../models/View_SuratMasuk');

const Modules = require('../../models/Modules');
const Departemen = require('../../models/Departemen');
const constant = require('../../../config/constant');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const hlp = require('../../helpers/helpers');


exports.datatableView_SuratMasuk=(req,res,next)=>{
    
    let select = {
       opt_select:['surat_id','no_surat','asal_surat','isi_surat','tanggal_surat','tanggal_masuk','status', 'catatan', 'nama_instansi', 'nama_instansi2', 'proses_surat']
    }
    View_SuratMasuk.surat_get(select).then(result=>{
         return res.json(result)
     })
 };
