const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const hlp = require('../helpers/helpers');

const constant = require('../../config/constant');

const User = require('../models/User');
const AksesPengguna = require('../models/AksesPengguna')
const Session = require('../models/Session');
const UserModule = require('../models/UserModule');
const flash = require('express-flash');


exports.datatableakses=(req,res,next)=>{
    
   let select = {
      opt_select:['id_akses','nm_lengkap','username','status','nohandphone','email','akses','password']
   }
    AksesPengguna.akses_get(select).then(result=>{
        
        return res.json(result)
    })
}
exports.insertakses = (req,res,next)=>{
  
 let arraydata = {
    nm_lengkap:req.body.namalengkappengguna,
   username:req.body.usernamepengguna,
    password:req.body.passwordpengguna,
    akses:req.body.namabagian,
    status: req.body.statuspengguna,
    nohandphone:req.body.handphonepengguna,
    email:req.body.emailpengguna
 };
 AksesPengguna.akses_add(arraydata).then(hasil=>{
   if(hasil)
   {

      let vars={
         pages:'../pages/AksesAdministrator',
         pageTitle:'AksesAdministrator'
     }
     res.render('layouts/admin_layout',vars);
   }
 }).catch(error=>{
    console.log(error);
 })
}