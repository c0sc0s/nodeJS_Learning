const secretKey = "ywj2023f";
const cookieKey = "token";
const jwt = require("jsonwebtoken")

exports.publish = function (res, maxAge = 3600 * 1000 * 24, info = {}) {
  const token = jwt.sign(info, secretKey, {
    expiresIn: maxAge
  });
  res.header("authorization", token);
}

exports.verify = function (req) {
  let token;
  token = req.headers.authorization;
  if (!token) {
    return null;
  }

  token = token.split(" ");
  token = token.length === 1 ? token[0] : token[1];

  try {
    const result = jwt.verify(token, secretKey);
    return result;
  } catch (e) {
    return null;
  }
}

