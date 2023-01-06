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
  const res = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  });
  if (res && res.loginId === loginId && res.loginPwd === loginPwd) {
    return res.toJSON();
  }
  return null;
}

exports.getAdminById = async id => {
  const res = await Admin.findByPk(id);
  if (res) {
    return res.toJSON();
  }
  return null;
}

