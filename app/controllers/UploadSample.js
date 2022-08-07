const hlp = require('../helpers/helpers');
const constant = require('../../config/constant');

exports.index = (req, res, next) => {
    if (req.method == 'POST') {
        console.log("Masuk ID");
        // ini hasil upload kalau mau disimpan ke tabel database
        console.log(req.file);
        hlp.genAlert(req, { message: constant.MY_FILEUPLOADED });
        return res.redirect('/upload');
    } else {
        console.log("Masuk Else");
        let breadcrumbs = {
            Home: '/admin',
            UserAkses: '#'
        }

        let vars = {
            breadcrumbs: hlp.genBreadcrumbs(breadcrumbs),
            menu_pengaturan: true,
            pages: '../pages/upload_sample',
            pageTitle: 'Upload',
        };
        res.render('layouts/admin_layout', vars);
    }
}
