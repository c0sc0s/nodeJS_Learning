const express = require('express');
const asyncHander = require('../helper/handlerWrap');
const classApi = require('../../api/classApi');

const router = express.Router();
module.exports = router;

// 添加班级
router.put(
  "/",
  asyncHander(
    async (req, res) => {
      return await classApi.addClass(req.body)
    }
  )
)

// 修改某个班级
router.put(
  "/:id",
  asyncHander(
    async (req, res) => {
      return await classApi.updateClass(req.params.id, req.body)
    }
  )
)

router.delete(
  "/:id",
  asyncHander(
    async (req, res) => {
      return await classApi.deleteClass(req.params.id)
    }
  )
)

router.get(
  "/",
  asyncHander(
    async (req, res) => {
      return await classApi.getClasses();
    }
  )
)

router.get(
  "/:id",
  asyncHander(
    async (req, res) => {
      return await classApi.getClassById(req.params.id)
    }
  )
)
