const validator = require('validator');
const Departemen = require('../../models/Departemen');
const constant = require('../../../config/constant');
const hlp = require('../../helpers/helpers');

exports.list = (req, res, next) => {
    let breadcrumbs = {
        Home: '/admin',
        Bagian: '#'
    }
    
    Departemen.tDepartemen.findAll({raw: true})
    .then(result => {  

        let vars = {
            q_departemen: result,
            breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
            menu_pengaturan: true,
            pages: '../admin/departemen_list',
            pageTitle: 'Daftar Departemen/Bagian'
        };
        res.render('layouts/admin_layout', vars);
    });
    
};


exports.add  =  (req, res, next) => {
    if (req.method=='POST') {
        Departemen.tDepartemen.create({
            departemen: req.body.departemen,
            keterangan: req.body.keterangan,
        });
        hlp.genAlert(req,{message: constant.MY_DATAINSERT});
        return res.redirect('/bagian');
        
    } else {
        let breadcrumbs = {
            Home: '/admin',
            Bagian: '/bagian',
            Add : '#'
        }
    
        let vars = {
            breadcrumbs : hlp.genBreadcrumbs(breadcrumbs),
            menu_pengaturan : true,
            pages: '../admin/departemen_form',
            pageTitle: 'Tambah Bagian',
            oldInput: hlp.oldInput(req),
            edit: false,
            q_departemen: false

        };
        res.render('layouts/admin_layout', vars);

    }
}

exports.edit  =  (req, res, next) => {
    if (req.method=='POST') {
        Departemen.tDepartemen.findOne({where:{departemenId: req.params.departemenId}}).then(result =>{
            let data = {
                departemenId: req.params.departemenId,
                departemen: req.body.departemen,
                keterangan: req.body.keterangan
            }
            Departemen.departemen_edit(data);
            hlp.genAlert(req,{message: constant.MY_DATAEDITED});
            return res.redirect('/bagian');
        });
        
    } else {
        Departemen.tDepartemen.findOne({where:{departemenId: req.params.departemenId}}).then(result =>{
            let breadcrumbs = {
                Home: '/admin',
                Bagian: '/bagian',
                Edit : '#'
            }
        
            let vars = {
                breadcrumbs : hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan : true,
                pages: '../admin/departemen_form',
                pageTitle: 'Edit Bagian',
                oldInput: hlp.oldInput(req),
                edit: true,
                q_departemen: result.dataValues
    
            };
            res.render('layouts/admin_layout', vars);
            
        });

    }
}


exports.delete = (req, res, next) => {   
    Departemen.tDepartemen.destroy({where: {departemenId: req.params.departemenId}})
    .then(result => {
        hlp.genAlert(req,{tipe: 'error',message:constant.MY_DATADELETE});
        return res.redirect('/bagian');
    })
    
};