const MockJS = require('mockjs');
const datas = MockJS.mock({
  "datas|500-700": [{
    "name": "@cname",
    "birthday": "@date",
    "sex|1-2": true,
    "mobile": /1\d{10}/,
    // "location": "@city(true)",
    "ClassId|1-16": 1,
  }],
}).datas;

// console.log(datas);


const Student = require("../models/Student")
Student.bulkCreate(datas);

