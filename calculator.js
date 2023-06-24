//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Server started at port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let n1 = Number(req.body.num1);
  let n2 = Number(req.body.num2);
  let op = req.body.operator;
  let result = 0;
  if (op == "+") {
    result = n1 + n2;
  } else if (op == "-") {
    result = n1 - n2;
  } else if (op == "/") {
    result = n1 / n2;
  } else if (op == "*") {
    result = n1 * n2;
  }

  res.send(n1 + " " + op + " " + n2 + " = " + result);
});
