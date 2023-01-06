const Class = require('../models/Class');
//增删改
exports.addClass = async function (classObj) {
  const ins = await Class.create(classObj);
  return ins.toJSON();
}

exports.deleteClass = async function (id) {
  Class.destroy({
    where: {
      id,
    }
  })
}

exports.updateClass = async function (id, classObj) {
  Class.update(classObj, {
    where: {
      id,
    }
  })
}

//查
//1. 查询所有班级
//2. 根据id查询班级

exports.getClasses = async () => {
  const res = await Class.findAll();
  const data = res && res.map(i => i.toJSON());
  return data;
}

exports.getClassById = async id => {
  const res = await Class.findByPk(id);
  if (res) {
    return res.toJSON();
  }
  return null;
}