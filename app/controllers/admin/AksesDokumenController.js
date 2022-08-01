const validator = require('validator');
const Departemen = require('../../models/Departemen');
const constant = require('../../../config/constant');
const hlp = require('../../helpers/helpers');

exports.list = (req, res, next) => {
    let breadcrumbs = {
        Home: '/admin',
        AksesDokumen: '#'
    }

    Departemen.vDepartemen.findAll({ raw: true, where: { departemenParentId: null } })
        .then(result => {
            let vars = {
                q_departemen: result,
                breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan: true,
                pages: '../admin/aksesdokumen_list',
                pageTitle: 'Pengaturan Akses Pengajuan dan Disposisi'
            };
            res.render('layouts/admin_layout', vars);
        });

};

exports.edit = (req, res, next) => {
    let breadcrumbs = {
        Home: '/admin',
        AksesDokumen: '#'
    }

    Departemen.vDepartemen.findOne({ raw: true, where: { departemenParentId: req.params.departemenId } })
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
