const express = require('express');
const router = express.Router();
const PageController = require('../app/controllers/PageController');
const AuthController = require('../app/controllers/AuthController');
const UserController = require('../app/controllers/admin/UserController');
const ModuleController = require('../app/controllers/admin/ModuleController');
const AksesPenggunaController = require('../app/controllers/AksesPenggunaController')

const isAuth = require('../app/middlewares/isAuth');
const canRegister = require('../app/middlewares/canRegister');
const checkPermission = require('../app/middlewares/checkPermission');



// router.get('/', PageController.homePage);
router.get('/', PageController.frontPage);
router.get('/login', AuthController.login);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/sign-up', canRegister, AuthController.signUp);
router.post('/sign-up', canRegister, AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPassword);
router.post('/forgot-password', AuthController.forgotPassword);
// ganti password default
router.get('/login-changepassword', isAuth('/login'), AuthController.changePassword);
router.post('/login-changepassword', isAuth('/login'), AuthController.changePassword);

router.get('/admin', isAuth(), PageController.adminPage);
router.get('/Home/:menus',isAuth(),PageController.aksesmenu);
router.get('/Settinguser/:menus',isAuth(),PageController.aksesmenu);
router.get('/Masteraplikasi/:menus',isAuth(),PageController.aksesmenu);
router.get('/Dokumen/:menus',isAuth(),PageController.aksesmenu);
router.get('/profile', isAuth(), UserController.profile);
router.get('/profile-changepassword', isAuth(), UserController.changePassword);
router.post('/profile-changepassword', isAuth(), UserController.changePassword);
router.post('/datatableaksespengguna',isAuth(),AksesPenggunaController.datatableakses);
router.post('/akses_add',isAuth(),AksesPenggunaController.insertakses)

// admin
router.get('/users', isAuth(), checkPermission('pm_admin'), UserController.list);
router.get('/users-add', isAuth(), checkPermission('pm_admin'), UserController.add);
router.post('/users-add', isAuth(), checkPermission('pm_admin'), UserController.add);

router.get('/users-delete/:userId', isAuth(), checkPermission('pm_admin'), UserController.delete);
router.get('/users-edit/:userId', isAuth(), checkPermission('pm_admin'), UserController.edit);
router.post('/users-edit/:userId', isAuth(), checkPermission('pm_admin'), UserController.edit);
router.post('/users-module-add', isAuth(), checkPermission('pm_admin'), UserController.moduleAdd);
router.get('/users-module-delete/:id', isAuth(), checkPermission('pm_admin'), UserController.moduleDelete);
router.get('/users-password-reset/:userId', isAuth(), checkPermission('pm_admin'), UserController.passwordReset);







router.get('/debug', isAuth, checkPermission('pm_admin'), PageController.debug);
router.get('/modules', isAuth, checkPermission('pm_admin'), ModuleController.list);
router.post('/modules-add', isAuth, checkPermission('pm_admin'), ModuleController.add);
router.get('/modules-delete/:userId/:moduleId', isAuth, checkPermission('pm_admin'), ModuleController.delete);








module.exports = router;