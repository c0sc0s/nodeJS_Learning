const Class = require('../models/Class');
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