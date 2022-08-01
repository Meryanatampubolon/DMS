const validator = require('validator');
const User = require('../../models/User');
const SuratKeluar = require('../../models/SuratKeluar');
const constant = require('../../../config/constant');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const hlp = require('../../helpers/helpers');

exports.list_keluar = (req, res, next) => {
    console.log(req.params.surat_id);
    console.log(req.body.surat_id);
    if (req.method == 'POST') {
        SuratKeluar.SuratKeluar.findOne({ where: { surat_id: req.body.surat_id } }).then(result => {
        });
    } else {

        const u = SuratKeluar.SuratKeluar.findOne({ where: { surat_id: req.params.surat_id } });
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

    SuratKeluar.SuratKeluar.destroy({ where: { surat_id: req.params.surat_id } })
        .then(result => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_DATADELETE });
            return res.redirect('/Dokumen/SuratKeluar');
        })  

};

exports.datatableSuratkeluar=(req,res,next)=>{
    
    let select = {
       opt_select:['surat_id','no_surat','asal_surat','isi_surat','tanggal_surat','tanggal_Diterima','status', 'catatan', 'nama_instansi', 'nama_instansi2', 'proses_surat']
    }
    SuratKeluar.surat_get(select).then(result=>{
        console.log(res.json(result))
         return res.json(result)
     })
 }

exports.insertsuratkeluar = (req,res,next)=>{
    let arraydata = {
       nama_instansi:req.body.f_Pengirim,
       no_surat:req.body.f_Nomor_Surat,
       no_agenda:req.body.f_Nomor_Agenda,
       kode_klasifikasi:req.body.f_Kode_Klasifikasi,
       tanggal_surat:req.body.f_tgl_surat,
       tanggal_diterima:req.body.f_tgl_diterima,
       tujuan: req.body.f_tujuan,
       catatan:req.body.f_Catatan,
       isi_surat:req.body.f_Isi_Surat,
      // proses_surat:req.body.f_ProsesSurat,
      // isi_surat:req.body.emailpengguna
    };
    console.log(arraydata);
    SuratKeluar.Suratkeluar_add(arraydata).then(hasil=>{
      if(hasil)
      {
         let vars={
            pages:'../pages/SuratKeluar',
            pageTitle:'/Dokumen/SuratKeluar'
        }
        res.render('layouts/admin_layout',vars);
      } 
    }).catch(error=>{
       console.log(error);
    })
};

exports.edit = (req, res, next) => {
    console.log(req.body.f_surat_id_edit)
    let arraydata = {
        surat_id:req.body.f_surat_id_edit,
        nama_instansi:req.body.f_Pengirim_edit,
        no_surat:req.body.f_Nomor_Surat_edit,
        tanggal_masuk:req.body.f_tgl_masuk_edit,
        tanggal_surat:req.body.f_tgl_surat_edit,
        nama_instansi2: req.body.f_nama_instansi_edit,
        catatan:req.body.f_catatan_edit,
        isi_surat:req.body.f_Isi_Surat_edit,
        proses_surat:req.body.f_ProsesSurat_edit
     };
    // kita pakai md5 supaya bisa dibaca apakah di user List terdeteksi sebagai default password atau belum    
    SuratMasuk.SuratMasuk_edit(arraydata)
        .then(r => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_USERPASSWORDCHANGED });
            return res.redirect('back');
        });
};

exports.edit = (req, res, next) => {
    let breadcrumbs = {
        Home: '/admin',
        AksesDokumen: '#'
    }
    SuratKeluar.SuratKeluar.findOne({ raw: true, where: { surat_id: req.params.surat_id } })
        .then(result => {
            let vars = {
                q_departemen: result,
                breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan: true,
                pages: '../admin/aksesdokumen_edit',
                pageTitle: 'Pengaturan Akses Pengajuan dan Disposisi'
            };
            res.render('layouts/admin_layout', vars);
        });

};