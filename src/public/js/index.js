fetch("http://localhost:9527/api/student", {
  method: "POST",
  headers: {
    "content-type": "application/json",
  }
}).then(r => r.json()).then(r => console.log(r))