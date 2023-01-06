const Admin = require('../models/Admin');
const md5 = require('md5');

//数据操作
exports.addAdmin = async function (adminObj) {
  adminObj.loginPwd = md5(adminObj.loginPwd);
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
  adminObj.loginPwd = md5(adminObj.loginPwd);
  Admin.update(adminObj, {
    where: {
      id,
    }
  })
}


//查询
//1.登录
//2.查询某位管理员
//3.插叙所有管理员
exports.login = async function (loginId, loginPwd) {
  loginPwd = md5(loginPwd)
  const res = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  });
  if (res && res.loginId === loginId) {
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

exports.getAdmins = async () => {
  const res = await Admin.findAll();
  const data = res && res.map(i => i.toJSON());
  return data;
}
