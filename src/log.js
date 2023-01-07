const log4js = require("log4js");
const path = require("path");

const sqlLogFilePath = path.resolve(__dirname, "logs", "sql", "logging.log")
const defaultLogFilePath = path.resolve(__dirname, "logs", "default", "logging.log")


log4js.configure({
  appenders: {
    sql: {
      type: "dateFile",
      filename: sqlLogFilePath,
      maxLogSize: 1024 * 1024 * 10,
      keepFileExt: true,
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-mm-dd hh:mm:ss}] [%p] [%c]-> %m %n"
      }
    },
    default: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "[%d{yyyy-mm-dd hh:mm:ss}] [%p] [cos✨]- %m"
      }
    }
  },
  categories: {
    sql: {
      appenders: ["sql"],
      level: "error"
    },
    default: {
      appenders: ["default"],
      level: "all"
    }
  }
})
const sqlLogger = log4js.getLogger("sql");
const defaultLogger = log4js.getLogger("default");

exports.sqlLogger = sqlLogger;
exports.logger = defaultLogger;

process.on("exit", () => {
  log4js.shutdown();
})