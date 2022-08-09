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
const Multer = require('multer')
const fs = require('fs');
const path = require('path');
const express = require('express');
const querystring = require('querystring');
const { response } = require('express');
//const Session = require('../models/Session');
// const session = require('express-session');
// const app = express();


// const pdf = require('pdf-creator-node');
// const options = require('../../models/options');
// const data = require('../../models/data');

const storage = Multer.diskStorage({
    destination:(req,file,cb)=>{
       var dir = './dokument/suratmasuk/'
       if(!fs.existsSync(dir))
       {
        fs.mkdirSync(dir);
       }
       cb(null,dir)


    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = Multer({storage:storage}).array("customFile_surat",12);


// const generatePdf = async (req, res, next) =>{
//     const html = fs.readFileSync(path.join(__dirname, '../view/admin/Template.html'), 'utf-8');
//     const filename = Math.random() +'_doc'+ '.pdf'

//     const u = SuratMasuk.SuratMasuk.findOne({ where: { surat_id: req.params.surat_id } });
//     Promise.all([u])
//     .then(result => {
//         if (result[0]) {
//             const dokumen ={
//                 html:html,
//                 data: {
//                     produck : result[0]
//                 },
//                 path: 
//             }

//             pdf.create()
//         } else {
//             hlp.genAlert(req, { tipe: 'error', message: constant.MY_USERDOESNOTEXISTS });
//             return res.redirect('/users');
//         }
//     });

  
// }



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
       opt_select:['surat_id','no_surat','isi_surat','tanggal_surat','tanggal_masuk','status', 'catatan', 'nama_instansi', 'nama_instansi2', 'proses_surat', 'file']
    }
     SuratMasuk.surat_get(select).then(result=>{

         return res.json(result)
     })
 }

exports.getsesion = (req, res, next) =>{
    // console.log(req.session['user']);
    console.log(req.session);
    return res.json(req.session)
}

exports.insertsuratmasuk = (req,res,next)=>{
    var hasilupload  = "";
    var namafile = "";
    upload(req,res,function(err){
        if(err)
            console.error(err);
        
        namafile = req.files[0].originalname; 
        let arraydata = {
            nama_instansi:req.body.f_Pengirim,
            no_surat:req.body.f_Nomor_Surat,
            tanggal_masuk:req.body.f_tgl_masuk,
            tanggal_surat:req.body.f_tgl_surat,
            nama_instansi2: req.body.f_nama_instansi,
            catatan:req.body.f_catatan,
            isi_surat:req.body.f_Isi_Surat,
            proses_surat:req.body.f_ProsesSurat,
            status:req.body.f_ProsesSurat,
            Disposisi:req.body.f_ProsesDisposisi,
            file:namafile
        };
        
      
        
        console.log(arraydata)
        SuratMasuk.Suratmasuk_add(arraydata).then(hasil=>{
        if(hasil)
        {
            // console.log(req.file);
            // hlp.genAlert(req, { message: constant.MY_FILEUPLOADED });
            // res.redirect('/upload');
            let vars={
                pages:'../pages/Suratmasuk',
                pageTitle:'/Dokumen/Suratmasuk'
            }
            res.render('layouts/admin_layout',vars);
        } 
        }).catch(error=>{
        console.log(error);
        })
    })
};


exports.ambildirectory = (req,res,next)=>{
    var dir1 = `./dokument/suratmasuk/`;
    fs.readdir(dir1,function(err,files){
        console.log(files);
        if(err)
        {
            console.log(err)
            res.statusCode = 404;
            res.end('directory not found');
        }
        else
        {
            const filepath = path.join(dir1,req.params.namasurat);
            fs.createReadStream(filepath).pipe(res);    
        }
    })
}

exports.downloadfilepdf = (req,res)=>{
    var dir1 = `./dokument/suratmasuk/`;
    fs.readdir(dir1,function(err,files){
        if(err)
        {
            console.log(err)
            res.statusCode = 404;
            res.end('directory not found');
        }
        else
        {
            var filepath = path.join(dir1,req.params.namasurat);
            var file = fs.createReadStream(filepath);
            var stat = fs.statSync(filepath);
            console.log(stat.size);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Content-Type', 'text/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${req.params.namasurat}`);
            file.pipe(res);
        }
    })
}

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
        pengirim_edit:req.body.f_Pengirim_edit,
        file:req.body.filename
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



exports.edit_detail = (req, res, next) => {
    let arraydata = {
        surat_id:req.params.surat_id,
        status:"Disetujui",
     };

     let breadcrumbs = {
                Home: '/admin',
                AksesDokumen: '#'
     }
    SuratMasuk.SuratMasuk_edit_detail(arraydata)
        .then(r => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_USERPASSWORDCHANGED });
        SuratMasuk.SuratMasuk.findOne({raw:true,where:{surat_id:req.params.surat_id}}).then(result=>{
            let vars = {
                q_departemen: result,
                breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan: true,
                pages: '../pages/SuratMasuk',
                pageTitle: 'Surat Masuk'
            };
            return res.render('layouts/admin_layout',vars);
        })
            
    });
};
