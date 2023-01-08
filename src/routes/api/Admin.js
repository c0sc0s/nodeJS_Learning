const express = require('express');
const asyncHandler = require('../helper/handlerWrap')
const adminApi = require('../../api/adminApi');


const router = express.Router();
module.exports = router;


//登录
router.post(
  '/',
  asyncHandler(
    async (req, res) => {
      const loginId = req.body.loginId;
      const loginPwd = req.body.loginPwd;
      const result = await adminApi.login(loginId, loginPwd);
      if (res) {
        const value = result.id;
        res.cookie("token", value, {
          path: "/",
          domain: "localhost",
          maxAge: 7 * 24 * 3600 * 1000,
          signed: true,
        });
        res.header("authorization", value);
        return "login success";
      }
      else {
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