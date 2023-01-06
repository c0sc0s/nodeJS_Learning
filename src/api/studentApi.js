const Student = require('../models/Student');
exports.addStudent = async function (studentObj) {
  const ins = await Student.create(studentObj);
  return ins.toJSON();
}

exports.deletStudent = async function (id) {
  Student.destroy({
    where: {
      id,
    }
  })
}

exports.updateStudent = async function (id, studentObj) {
  Student.update(studentObj, {
    where: {
      id,
    }
  })
}