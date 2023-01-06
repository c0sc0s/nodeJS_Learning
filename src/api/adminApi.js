const Admin = require('../models/Admin');
exports.addAdmin = async function (adminObj) {
  const ins = await Admin.create(adminObj);
  return ins.toJSON();
}

exports.deletAdmin = async function (id) {
  Admin.destroy({
    where: {
      id,
    }
  })
}

exports.updateAdmin = async function (id, adminObj) {
  Admin.update(adminObj, {
    where: {
      id,
    }
  })
}

exports.login = async function (loginId, loginPwd) {
  Admin.findOne({
    where: {

    }
  })
}

