require("./models/relation");
// require("./mock/mockStudent")
// require("./spider/fetchBooks")

const adminApi = require("./api/adminApi");
// adminApi.addAdmin({
//   loginId: "admin",
//   loginPwd: "1234"
// })
adminApi.login("admin", "1234").then(r => console.log(r))


// const StudentApi = require("./api/studentApi");
// StudentApi.getStudents(1, 1, 0, "李").then(s => {
//   console.log(res);
// });
// StudentApi.getStudentById(2705).then(r => console.log(r))

// const BookApi = require("./api/bookApi");
// BookApi.getBooks(1, 10, "", "批判").then(res => {
//   console.log(res);
// });
// BookApi.getBookById(1).then(r => console.log(r))

// const ClassApi = require("./api/classApi");
// ClassApi.getClassById(1).then(r => console.log(r))