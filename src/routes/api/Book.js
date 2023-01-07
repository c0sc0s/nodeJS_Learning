const express = require('express');
const asyncHandler = require('../helper/handlerWrap')
const bookApi = require('../../api/bookApi')

const router = express.Router();
module.exports = router;

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { page, limit, author, name } = req.query;
    return await bookApi.getBooks(page, limit, author, name);
  })
)

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    return await bookApi.getBookById(id);
  })
)

router.put(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    return await bookApi.updateBook(id, req.body);
  })
)

router.put(
  "/",
  asyncHandler(async (req, res) => {
    return await bookApi.addBook(req.body);
  })
)

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    return await bookApi.deletBook(id);
  })
)