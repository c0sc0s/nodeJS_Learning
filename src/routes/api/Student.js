const express = require('express');
const stuApi = require("../../api/studentApi")
const sendMsg = require("../helper/getSendResult")
const asyncHandler = require("../helper/handlerWrap")


const studentRouter = express.Router();
module.exports = studentRouter;


studentRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const sex = +req.query.sex;
    const name = req.query.name || "";

    return await stuApi.getStudents(page, limit, sex, name);
  })
)

studentRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    req.params.id
    return await stuApi.getStudentById(req.params.id)
  })
)

studentRouter.post(
  "/",
  asyncHandler(async (req, res, next) => {
    return await stuApi.addStudent(req.body);
  })
)

studentRouter.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuApi.deletStudent(req.params.id)
  })
)

studentRouter.put(
  "/:id",
  asyncHandler(async (req, res, next) => {
    return await stuApi.updateStudent(req.params.id, req.body)
  })
)

