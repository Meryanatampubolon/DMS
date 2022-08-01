
const hlp = require('../helpers/helpers');

exports.pageNotFound = (req, res, next) => {

    let vars = {
        pages: '../pages/404',
        pageTitle: ' Page not found'
    };
    res.render('layouts/blank_layout', vars);
};

exports.adminPage = (req, res, next) => {

    let vars = {
        pages: '../pages/dashboard',
        pageTitle: 'Dashboard'
    };
    res.render('layouts/admin_layout', vars);
};

exports.aksesmenu = (req,res,next) =>{
    let breadcrumbs = {}
    if(req.params.menus == "dashboard")
    {
        breadcrumbs = {
            Home:'#',
            Dashboard:'#'
        }
    }
    else if(req.params.menus == "AksesAdministrator")
    {
        breadcrumbs = {
            Settinguser:'#',
            AksesAdministrator:'#'
        }
    }
    else if(req.params.menus == "Suratmasuk")
    {
        breadcrumbs = {
            Dokumen: '#',
            SuratMasuk:'#'
        }
    }
    else if(req.params.menus == "Disposisi")
    {
        breadcrumbs = {
            Dokumen: '#',
            Disposisi:'#'
        }
    }
    else if(req.params.menus == "Suratkeluar")
    {
        breadcrumbs = {
            Dokumen: '#',
            SuratKeluar:'#'
        }
    }
    let vars={
        breadcrumbs : hlp.genBreadcrumbs(breadcrumbs),
        pages:'../pages/'+req.params.menus,
        pageTitle:req.params.menus
    }
    res.render('layouts/admin_layout',vars);
}
exports.aksesmenu1 = (req,res,next) =>{
    console.log(req);
    let vars={
        pages:'../pages/tentangkami',
        pageTitle:'tentangkami'
    }
    res.render('layouts/admin_layout',vars);
}
exports.frontPage = (req, res, next) => {
    
    let vars = {
        pages: '../pages/frontpage',
        pageTitle: res.locals.env_sitetitle
    };
    res.render('layouts/frontpage_layout', vars);
};

exports.debug = (req, res, next) => {
    let vars = {
        pages: '../pages/debug',
        pageTitle: 'debug',
        data: JSON.stringify({
            res_dot_locals: res.locals
        }, null, 4)
    };
    
    res.render('layouts/admin_layout', vars);
};

exports.tentangkami = (req,res,next)=>{
    let vars = {
        pages:'../pages/tentangkami',
        pageTitle:res.locals.env_sitetitle
    };
    res.render('layouts/frontpage_layout',vars);
}