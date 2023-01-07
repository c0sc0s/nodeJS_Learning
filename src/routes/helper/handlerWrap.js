const sendMsg = require("./getSendResult")

module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(sendMsg.getResult(result));
    } catch (err) {
      next(err)
    }
  }
}