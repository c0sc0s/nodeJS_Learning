const Student = require('../models/Student');
const { Op } = require("sequelize")
const Class = require('../models/Class');
const validate = require('validate.js');
const moment = require('moment');

exports.addStudent = async function (studentObj) {

  validate.validators.classExists = async value => {
    const c = await Class.findByPk(value)

    return c ? undefined : "ClassId Is Not Exists"
  }

  // 验证规则
  const rule = {
    name: {
      presence: {
        allowEmpty: false,
      },
      type: "string",
      length: {
        minimum: 1,
        maximum: 10
      }
    },
    birthday: {
      presence: {
        allowEmpty: false,
      },
      datetime: {
        dateOnly: true,
        earliest: +moment.utc().subtract(100, "y"),
        latest: +moment.utc().subtract(5, "y")
      }
    },
    mobile: {
      presence: {
        allowEmpty: false,
      },
      format: /1\d{10}/,
    },
    ClassId: {
      presence: true,
      numericality: {
        onlyInteger: true,
        strict: false,
      },
      classExists: true,
    }
  }

  await validate.async(studentObj, rule);
  //验证失败则抛出错误

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
    attributes: ["id", "name", "sex", "birthday", "age"],
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
