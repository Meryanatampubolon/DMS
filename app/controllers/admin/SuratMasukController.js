const validator = require('validator');
const User = require('../../models/User');
const SuratMasuk = require('../../models/SuratMasuk');
const UserDepartemen = require('../../models/UserDepartemen');
const Modules = require('../../models/Modules');
const Departemen = require('../../models/Departemen');
const constant = require('../../../config/constant');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const hlp = require('../../helpers/helpers');


exports.list_masuk = (req, res, next) => {

    if (req.method == 'POST') {
        SuratMasuk.SuratMasuk.findOne({ where: { surat_id: req.body.surat_id } }).then(result => {
        });
    } else {

        const u = SuratMasuk.SuratMasuk.findOne({ where: { surat_id: req.params.surat_id } });
        Promise.all([u])
            .then(result => {
                if (result[0]) {
                    let breadcrumbs = {
                        Home: '/admin',
                        Users: '/users',
                        Edit: '#'
                    }

                    let vars = {
                        data_surat: result[0],
                        breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                        menu_admin: true,
                        pages: '../admin/detail_surat_masuk',
                        pageTitle: 'Detail Surat Masuk',
                        oldInput: hlp.oldInput(req),
                        edit: true,
                        userId: req.params.surat_id
                    };
                    res.render('layouts/admin_layout', vars);
                } else {
                    hlp.genAlert(req, { tipe: 'error', message: constant.MY_USERDOESNOTEXISTS });
                    return res.redirect('/users');
                }
            });
    }
}

exports.delete = (req, res, next) => {

    SuratMasuk.SuratMasuk.destroy({ where: { surat_id: req.params.surat_id } })
        .then(result => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_DATADELETE });
            return res.redirect('/Dokumen/Suratmasuk');
        })  

};

exports.datatableSuratMasuk=(req,res,next)=>{
    
    let select = {
       opt_select:['surat_id','no_surat','asal_surat','isi_surat','tanggal_surat','tanggal_masuk','status', 'catatan', 'nama_instansi', 'nama_instansi2', 'proses_surat']
    }
     SuratMasuk.surat_get(select).then(result=>{
         return res.json(result)
     })
 }

exports.insertsuratmasuk = (req,res,next)=>{
    
    let arraydata = {
       nama_instansi:req.body.f_Pengirim,
       no_surat:req.body.f_Nomor_Surat,
       tanggal_masuk:req.body.f_tgl_masuk,
       tanggal_surat:req.body.f_tgl_surat,
       nama_instansi2: req.body.f_nama_instansi,
       catatan:req.body.f_catatan,
       isi_surat:req.body.f_Isi_Surat,
       proses_surat:req.body.f_ProsesSurat,
       status:req.body.f_ProsesSurat_edit
      // isi_surat:req.body.emailpengguna
    };
    
    SuratMasuk.Suratmasuk_add(arraydata).then(hasil=>{
      if(hasil)
      {
         let vars={
            pages:'../pages/Suratmasuk',
            pageTitle:'/Dokumen/Suratmasuk'
        }
        res.render('layouts/admin_layout',vars);
      } 
    }).catch(error=>{
       console.log(error);
    })
};

exports.edit = (req, res, next) => {
    let arraydata = {
        surat_id:req.body.f_surat_id_edit,
        nama_instansi:req.body.f_Pengirim_edit,
        no_surat:req.body.f_Nomor_Surat_edit,
        tanggal_masuk:req.body.f_tgl_masuk_edit,
        tanggal_surat:req.body.f_tgl_surat_edit,
        nama_instansi2: req.body.f_nama_instansi_edit,
        catatan:req.body.f_catatan_edit,
        isi_surat:req.body.f_Isi_Surat_edit,
        proses_surat:req.body.f_ProsesSurat_edit,
        status:req.body.f_ProsesSurat_edit,
        pengirim_edit:req.body.f_Pengirim_edit
     };

     let breadcrumbs = {
                Home: '/admin',
                AksesDokumen: '#'
            }
     
    // kita pakai md5 supaya bisa dibaca apakah di user List terdeteksi sebagai default password atau belum    
    SuratMasuk.SuratMasuk_edit(arraydata)
        .then(r => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_USERPASSWORDCHANGED });
        SuratMasuk.SuratMasuk.findOne({raw:true,where:{surat_id:req.params.surat_id}}).then(result=>{
            let vars = {
                q_departemen: result,
                breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan: true,
                pages: '../pages/SuratMasuk',
                pageTitle: 'Pengaturan Akses Pengajuan dan Disposisi'
            };
            return res.render('layouts/admin_layout',vars);
        })
            
        });
};
