//
const User = require('../app/models/User');
const Session = require('../app/models/Session');
const UserModule = require('../app/models/UserModule');
const Modules = require('../app/models/Modules');
const AksesPengguna = require('../app/models/AksesPengguna');
const UserDepartemen = require('../app/models/UserDepartemen');
const Departemen = require('../app/models/Departemen');
const Instansi = require('../app/models/Instansi');
const SuratMasuk = require('../app/models/SuratMasuk');
const SuratKeluar = require('../app/models/SuratKeluar');


User.tUser.sync();
Session.sync();
UserModule.tUserModule.sync();
Modules.sync();
UserDepartemen.tUserDepartemen.sync();
Departemen.tDepartemen.sync();
Instansi.sync();
AksesPengguna.taksesaplikasi.sync();
SuratMasuk.SuratMasuk.sync();
SuratKeluar.SuratKeluar.sync();