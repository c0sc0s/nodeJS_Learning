const express = require('express');
const asyncHandler = require('../helper/handlerWrap')
const adminApi = require('../../api/adminApi');
const jwt = require("../jwt");

const router = express.Router();
module.exports = router;


//登录
router.post(
  '/login',
  asyncHandler(
    async (req, res) => {
      const loginId = req.body.loginId;
      const loginPwd = req.body.loginPwd;
      const result = await adminApi.login(loginId, loginPwd);
      if (result) {
        jwt.publish(res, undefined, { id: result.id });
        console.log("登录成功");
        return "login successfully";
      }
      else {
        console.log("登录失败");
        return null;
      }
    }
  ),
)

// 注册
router.put(
  '/register',
  asyncHandler(
    async (req, res) => {
      return await adminApi.addAdmin(req.body);
    }
  ),
)

// 删除
router.delete(
  '/',
  asyncHandler(
    async (req, res) => {
      return await adminApi.deleteAdmin(req.query.id);
    }
  ),
)

// 更新
router.put(
  "/",
  asyncHandler(
    async (req, res) => {
      return await adminApi.updateAdmin(req.body.id, req.body.data);
    }
  )
)