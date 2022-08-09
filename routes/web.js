const express = require('express');
const path = require('path');
const router = express.Router();
const PageController = require('../app/controllers/PageController');
const AuthController = require('../app/controllers/AuthController');
const UserController = require('../app/controllers/admin/UserController');
const SuratMasukController = require('../app/controllers/admin/SuratMasukController');
const ModuleController = require('../app/controllers/admin/ModuleController');
const AksesPenggunaController = require('../app/controllers/AksesPenggunaController');
const InstansiController = require('../app/controllers/admin/InstansiController');
const DepartemenController = require('../app/controllers/admin/DepartemenController');
const AksesDokumenController = require('../app/controllers/admin/AksesDokumenController');
const SuratKeluarController = require('../app/controllers/admin/SuratKeluarController');
// const pdfserviceController = require('../app/controllers/admin/pdfservice');

const UploadSample = require('../app/controllers/UploadSample');


const isAuth = require('../app/middlewares/isAuth');
const canRegister = require('../app/middlewares/canRegister');
const checkPermission = require('../app/middlewares/checkPermission');
const { SuratMasuk } = require('../app/models/SuratMasuk');
const { SuratKeluar } = require('../app/models/SuratKeluar');

// untuk windows mungkin perlu disesuaikan tanda "/" atau "\"
// const uploadPath = path.join(__dirname, '../public/upload');

// const path = path.join(__dirname, '../public/upload');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });






// router.get('/', PageController.homePage);
router.get('/', PageController.frontPage);
router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/sign-up', canRegister(), AuthController.signUp);
router.post('/sign-up', canRegister(), AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPassword);
router.post('/forgot-password', AuthController.forgotPassword);
// ganti password default
router.get('/login-changepassword', isAuth('/login'), AuthController.changePassword);
router.post('/login-changepassword', isAuth('/login'), AuthController.changePassword);

router.get('/admin', isAuth(), PageController.adminPage);

router.get('/Home/:menus', isAuth(), PageController.aksesmenu);
router.get('/Settinguser/:menus', isAuth(), PageController.aksesmenu);
router.get('/Masteraplikasi/:menus', isAuth(), PageController.aksesmenu);
router.get('/Dokumen/:menus', isAuth(), PageController.aksesmenu);
router.get('/profile', isAuth(), UserController.profile);
router.get('/profile-changepassword', isAuth(), UserController.changePassword);
router.post('/profile-changepassword', isAuth(), UserController.changePassword);
router.post('/datatableaksespengguna', isAuth(), AksesPenggunaController.datatableakses);
router.post('/akses_add', isAuth(), AksesPenggunaController.insertakses)

// admin
router.get('/users', isAuth(), checkPermission('pm_superadmin'), UserController.list);
router.get('/users-add', isAuth(), checkPermission('pm_superadmin'), UserController.add);
router.post('/users-add', isAuth(), checkPermission('pm_superadmin'), UserController.add);

router.get('/users-delete/:userId', isAuth(), checkPermission('pm_superadmin'), UserController.delete);
router.get('/users-edit/:userId', isAuth(), checkPermission('pm_superadmin'), UserController.edit);
router.post('/users-edit/:userId', isAuth(), checkPermission('pm_superadmin'), UserController.edit);
router.post('/users-module-add', isAuth(), checkPermission('pm_superadmin'), UserController.moduleAdd);
router.get('/users-module-delete/:id', isAuth(), checkPermission('pm_superadmin'), UserController.moduleDelete);
router.get('/users-password-reset/:userId', isAuth(), checkPermission('pm_superadmin'), UserController.passwordReset);

router.get('/debug', isAuth(), checkPermission('pm_superadmin'), PageController.debug);
router.get('/modules', isAuth(), checkPermission('pm_superadmin'), ModuleController.list);
router.post('/modules-add', isAuth(), checkPermission('pm_superadmin'), ModuleController.add);
router.get('/modules-delete/:userId/:moduleId', isAuth(), checkPermission('pm_superadmin'), ModuleController.delete);

router.get('/instansi', isAuth(), checkPermission('pm_administrator'), InstansiController.index);
router.post('/instansi', isAuth(), checkPermission('pm_administrator'), InstansiController.index);


router.get('/bagian', isAuth(), checkPermission('pm_administrator'), DepartemenController.list);
router.get('/bagian-add', isAuth(), checkPermission('pm_administrator'), DepartemenController.add);
router.post('/bagian-add', isAuth(), checkPermission('pm_administrator'), DepartemenController.add);
router.get('/bagian-edit/:departemenId', isAuth(), checkPermission('pm_administrator'), DepartemenController.edit);
router.post('/bagian-edit/:departemenId', isAuth(), checkPermission('pm_administrator'), DepartemenController.edit);
router.get('/bagian-delete/:departemenId', isAuth(), checkPermission('pm_administrator'), DepartemenController.delete);

router.get('/subbagian', isAuth(), checkPermission('pm_administrator'), DepartemenController.subbagian_list);

router.post('/subbagian-add', isAuth(), checkPermission('pm_administrator'), DepartemenController.subbagian_add);
router.post('/subbagian-edit/:departemenId', isAuth(), checkPermission('pm_administrator'), DepartemenController.subbagian_edit);
router.get('/subbagian-delete/:departemenId/:redirectUrl', isAuth(), checkPermission('pm_administrator'), DepartemenController.subbagian_delete);

router.get('/pengguna', isAuth(), checkPermission('pm_administrator'), UserController.list_nonadmin);
router.post('/pengguna-add', isAuth(), checkPermission('pm_administrator'), UserController.add_nonadmin);
router.post('/pengguna-delete', isAuth(), checkPermission('pm_administrator'), UserController.delete_nonadmin);
router.get('/administrator', isAuth(), checkPermission('pm_administrator'), UserController.list_admin);


router.get('/aksesdokumen', isAuth(), checkPermission('pm_administrator'), AksesDokumenController.list);
router.get('/aksesdokumen-edit/:departemenId', isAuth(), checkPermission('pm_administrator'), AksesDokumenController.edit);

router.get('/SuratMasuk/:surat_id', isAuth(), SuratMasukController.list_masuk);
router.post('/Masuk-add', isAuth(), SuratMasukController.insertsuratmasuk);
router.post('/datatableakSuratMasuk', isAuth(), SuratMasukController.datatableSuratMasuk);
router.get('/suratmasuk-delete/:surat_id', isAuth(), SuratMasukController.delete);
router.post('/Edit/:surat_id', isAuth(), SuratMasukController.edit);


router.get('/SuratKeluar/:surat_id', isAuth(), SuratKeluarController.list_keluar);
router.post('/keluar-add', isAuth(), SuratKeluarController.insertsuratkeluar);
router.post('/datatableakSuratkeluar', isAuth(), SuratKeluarController.datatableSuratkeluar);
router.get('/suratkeluar-delete/:surat_id', isAuth(), SuratKeluarController.delete);
router.post('/Edit-keluar/:surat_id', isAuth(), SuratKeluarController.edit_keluar);





router.get('/upload', isAuth(), UploadSample.index);
// filename adalah nama komponen "file" didalam view
 router.post('/upload', isAuth(), upload.single('filename'), UploadSample.index);

router.get('/pdf/:namasurat',isAuth(),SuratMasukController.ambildirectory)

router.get('/downloadpdf/:namasurat',isAuth(),SuratMasukController.downloadfilepdf)


router.post('/getsesion', isAuth(), SuratMasukController.getsesion);

router.post('/setujui_disposisi/:surat_id', isAuth(), SuratMasukController.edit_detail);
module.exports = router;    