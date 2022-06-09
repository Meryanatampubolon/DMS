const validator = require('validator');
const User = require('../models/User');
const UserModule = require('../models/UserModule');
const Module = require('../models/Module');

exports.profile = (req, res, next) => {
    res.render('profile');
};