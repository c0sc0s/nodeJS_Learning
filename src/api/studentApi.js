const Student = require('../models/Student');
const { Op } = require("sequelize")
const Class = require('../models/Class');

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



exports.getStudents = async function (page = 1, limit = 10, sex = -1, name) {

  const condition = {}
  if (sex === 1 || sex === 0) {
    condition.sex = sex
  }

  if (name) {
    condition.name = {
      [Op.like]: `%${name}%`
    }
  }


  const res = await Student.findAndCountAll({
    attributes: ["id", "name", "sex", "birthday"],
    where: condition,
    include: [Class],
    offset: (page - 1) * limit,
    limit: +limit
  });

  return {
    total: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  };
}

exports.getStudentById = async id => {
  let res = await Student.findByPk(id)
  res && (res = res.toJSON());
  return res;
}
