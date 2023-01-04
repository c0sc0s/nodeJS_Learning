let i = 0;
console.time();
function test() {
  i++;
  if (i < 1000) {
    setTimeout(test, 0);
  } else {
    console.timeEnd();
  }
}
test();