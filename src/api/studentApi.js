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

exports.getStudents = async function (page = 1, limit = 10) {
  const results = await Student.findAll({
    offset: (page - 1) * limit,
    limit: +limit,
  });
  const total = await Student.count();
  const datas = JSON.parse(JSON.stringify(results));
  return {
    total, datas
  }
}