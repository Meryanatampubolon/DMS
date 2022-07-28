const validator = require('validator');
const Departemen = require('../../models/Departemen');
const constant = require('../../../config/constant');
const hlp = require('../../helpers/helpers');

exports.list = (req, res, next) => {
    let breadcrumbs = {
        Home: '/admin',
        Bagian: '#'
    }

    Departemen.vDepartemen.findAll({ raw: true, where: { departemenParentId: null } })
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


exports.add = (req, res, next) => {
    if (req.method == 'POST') {
        Departemen.tDepartemen.create({
            departemen: req.body.departemen,
            keterangan: req.body.keterangan,
        });
        hlp.genAlert(req, { message: constant.MY_DATAINSERT });
        return res.redirect('/bagian');

    } else {
        let breadcrumbs = {
            Home: '/admin',
            Bagian: '/bagian',
            Add: '#'
        }

        let vars = {
            breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
            menu_pengaturan: true,
            pages: '../admin/departemen_form',
            pageTitle: 'Tambah Bagian',
            oldInput: hlp.oldInput(req),
            edit: false,
            q_departemen: false

        };
        res.render('layouts/admin_layout', vars);

    }
}

exports.edit = (req, res, next) => {
    if (req.method == 'POST') {
        Departemen.tDepartemen.findOne({ where: { departemenId: req.params.departemenId } }).then(result => {
            let data = {
                departemenId: req.params.departemenId,
                departemen: req.body.departemen,
                keterangan: req.body.keterangan
            }
            Departemen.departemen_edit(data);
            hlp.genAlert(req, { message: constant.MY_DATAEDITED });
            return res.redirect('/bagian');
        });

    } else {
        const q1 = Departemen.tDepartemen.findOne({ raw: true, where: { departemenId: req.params.departemenId } });
        const q2 = Departemen.tDepartemen.findAll({ raw: true, where: { departemenParentId: req.params.departemenId } });
        Promise.all([q1, q2]).then(result => {
            let breadcrumbs = {
                Home: '/admin',
                Bagian: '/bagian',
                Edit: '#'
            };

            let vars = {
                breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
                menu_pengaturan: true,
                pages: '../admin/departemen_form',
                pageTitle: 'Edit Bagian',
                oldInput: hlp.oldInput(req),
                edit: true,
                q_departemen: result[0],
                q_subdepartemen: result[1],
            };
            res.render('layouts/admin_layout', vars);
        });


    }
}

exports.delete = (req, res, next) => {
    Departemen.tDepartemen.destroy({ where: { departemenId: req.params.departemenId } })
        .then(result => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_DATADELETE });
            return res.redirect('/bagian');
        })

};

exports.subbagian_list = (req, res, next) => {
    const q1 = Departemen.vDepartemen.findAll({ raw: true, where: { departemenParentId: null } });
    const q2 = Departemen.vDepartemen2.findAll({ raw: true });
    Promise.all([q1, q2]).then(result => {
        let breadcrumbs = {
            Home: "/admin",
            SubBagian: "#",
        };
        let vars = {
            q_departemen: result[0],
            q_subdepartemen: result[1],

            breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
            oldInput: hlp.oldInput(req),
            menu_pengaturan: true,
            pages: "../admin/subdepartemen_list",
            pageTitle: "Daftar Sub Bagian",
        };
        res.render("layouts/admin_layout", vars);
    });

};

exports.subbagian_add = (req, res, next) => {
    redirectUrl = hlp.decrypt(req.body.redirectUrl);
    Departemen.tDepartemen.create({
        departemenParentId: req.body.departemenParentId,
        departemen: req.body.subdepartemen,
        keterangan: req.body.subketerangan,
    });
    hlp.genAlert(req, { message: constant.MY_DATAINSERT });
    return res.redirect(redirectUrl);
}

exports.subbagian_edit = (req, res, next) => {
    redirectUrl = hlp.decrypt(req.body.redirectUrl);
    let data = {
        departemenId: req.params.departemenId,
        departemenParentId: req.body.departemenParentId,
        departemen: req.body.subdepartemen,
        keterangan: req.body.subketerangan
    }
    Departemen.departemen_edit(data);
    hlp.genAlert(req, { message: constant.MY_DATAEDITED });
    return res.redirect(redirectUrl);
}

exports.subbagian_delete = (req, res, next) => {
    Departemen.tDepartemen.destroy({ where: { departemenId: req.params.departemenId } })
        .then(result => {
            hlp.genAlert(req, { tipe: 'error', message: constant.MY_DATADELETE });
            return res.redirect(hlp.decrypt(req.params.redirectUrl));
        })

};