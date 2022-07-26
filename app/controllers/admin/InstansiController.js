const validator = require('validator');
const Instansi = require('../../models/Instansi');
const constant = require('../../../config/constant');
const hlp = require('../../helpers/helpers');

exports.index =  (req, res, next) => {
    if (req.method == 'POST') {
        Instansi.findOne({raw: true, where: {id: 1}})
        .then(result => { 
            if(result) {
                Instansi.update({instansi: req.body.instansi, alamat: req.body.alamat},{where: {id:1}});
                hlp.genAlert(req,{message: constant.MY_DATAEDITED});
                return res.redirect('/instansi');
            } else {
                Instansi.create({instansi: req.body.instansi, alamat: req.body.alamat});
                hlp.genAlert(req,{message: constant.MY_DATAEDITED});
                return res.redirect('/instansi');
            }
        });
    }
    else {
        Instansi.findOne({raw: true, where: {id: 1}})
        .then(result => {   
            let breadcrumbs = {
                Home: '/admin',
                Instansi: '#'
            }
            let vars = {
                breadcrumbs : hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan : true,
                pages: '../admin/instansi_form',
                pageTitle: 'Pengaturan - Instansi',
                oldInput: hlp.oldInput(req),
                q_instansi: result
            };
            res.render('layouts/admin_layout', vars);
        });    
    }
}