const Book = require('../models/Book');
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