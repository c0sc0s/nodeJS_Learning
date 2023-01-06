const Book = require('../models/Book');
const { Op } = require("sequelize")


//数据更新
exports.addBook = async function (bookObj) {
  const ins = await Book.create(bookObj);
  return ins.toJSON();
}

exports.deletBook = async function (id) {
  Book.destroy({
    where: {
      id,
    }
  })
}

exports.updateBook = async function (id, bookObj) {
  Book.update(bookObj, {
    where: {
      id,
    }
  })
}

//查
//分页查询，可以根据关键字查询
//关键字： 作者，书名

exports.getBooks = async (page = 1, limit = 10, author, name) => {
  const condition = {};

  author && (condition.author = {
    [Op.like]: `%${author}%`
  });

  name && (condition.name = {
    [Op.like]: `%${name}%`
  });

  const res = await Book.findAndCountAll({
    attributes: ["id", "name", "imgurl", "author", "publishDate"],
    where: condition,
    offset: (page - 1) * limit,
    limit: +limit
  });

  return {
    total: res.count,
    datas: JSON.parse(JSON.stringify(res.rows))
  }
}


exports.getBookById = async id => {
  let res = await Book.findByPk(id)
  res && (res = res.toJSON());
  return res;
}
