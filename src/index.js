require("./init")

const StudentApi = require('./api/studentApi');

StudentApi
  .addStudent({
    name: "abccccc",
    birthday: "2002-2-1",
    mobile: "19180861270",
    ClassId: 19
  })
  .catch(err => console.log(err));