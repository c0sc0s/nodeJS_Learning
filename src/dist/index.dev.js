"use strict";

var fs = require("fs");

var path = require("path");

var filename = path.resolve("./");
var filename2 = path.resolve(__dirname);
console.log(filename === filename2);
console.log("hello" === "hello");