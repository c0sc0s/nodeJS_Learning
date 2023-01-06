const MockJS = require('mockjs');
const res = MockJS.mock({
  "datas|16": [{
    "id|+1": 0,
    "name": "前端 @id 期",
    "openDate": "@date"
  }],
}).datas;

const Class = require("../models/Class")
Class.bulkCreate(res);

