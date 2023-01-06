// require("./models/relation");
// require("./mock/mockStudent")
// require("./spider/fetchBooks")

const StudentApi = require("./api/studentApi");

StudentApi.getStudents().then(res => {
  console.log(res);
});