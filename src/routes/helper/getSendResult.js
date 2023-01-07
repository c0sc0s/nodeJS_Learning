exports.getErr = function (err = "server interval error", errCode = 500) {
  return {
    code: errCode,
    msg: err,
  }
}

exports.getResult = function (data) {
  return {
    code: 0,
    msg: "",
    data
  }
}