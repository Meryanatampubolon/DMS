//
const User = require('../app/models/User');
const Session = require('../app/models/Session');
const UserModule = require('../app/models/UserModule');
const Module = require('../app/models/Module');

User.sync();
Session.sync();
UserModule.sync();
Module.sync();