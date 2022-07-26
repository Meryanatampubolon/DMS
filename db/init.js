//
const User = require('../app/models/User');
const Session = require('../app/models/Session');
const UserModule = require('../app/models/UserModule');
const Modules = require('../app/models/Modules');
const UserDepartemen = require('../app/models/UserDepartemen');
const Departemen = require('../app/models/Departemen');
const Instansi = require('../app/models/Instansi');



User.tUser.sync();
Session.sync();
UserModule.tUserModule.sync();
Modules.sync();
UserDepartemen.tUserDepartemen.sync();
Departemen.tDepartemen.sync();
Instansi.sync();
