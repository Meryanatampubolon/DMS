const constant = require('../../config/constant');
const hlp = require('../helpers/helpers');


module.exports = (param) => {
    return (req, res, next) => {
        let result = false;
        if (!req.session[param]) {
            req.flash('alert', hlp.toastr({ tipe: 'error', message: constant.MY_NOAKSES }));
            return res.redirect('/');
        }
        next();
    }
}