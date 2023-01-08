const { getErr } = require("../helper/getSendResult");
const { pathToRegexp } = require("path-to-regexp");

const needTokenApi = [
  { method: "GET", path: "/api/student" },
  { method: "POST", path: "/api/student" },
  { method: "PUT", path: "/api/student/:id" },
];



// 解析token
module.exports = (req, res, next) => {

  const api = needTokenApi.filter(api => {
    const reg = pathToRegexp(api.path);
    return (req.method === api.method) && reg.test(req.path);
  })

  if (api.length === 0) {
    next();
    return;
  }



  let token = req.signedCookies.token;
  if (!token) {
    token = req.headers.authorization;
  }

  // 验证token

  if (!token) {
    console.log("验证失败");
    handleNonToken(req, res, next);
    return;
  }

  console.log("验证成功");
  next();

}

function handleNonToken(req, res, next) {
  res.status(403).send(getErr("you don't have permission", 403))
}