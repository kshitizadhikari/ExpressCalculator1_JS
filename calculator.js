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

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "\\bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  let weight = req.body.weight;
  let height = req.body.height;

  const bmiInfo = calculateBMI(weight, height);
  let bmi = bmiInfo.bmi;
  let condition = bmiInfo.condition;
  res.send("BMI = " + bmi + " Condition = " + condition);
});

function calculateBMI(weight, height) {
  let heightInMeters = height * 0.3048;
  let bmi = weight / (heightInMeters ^ 2);
  let condition = "";
  bmi = bmi.toFixed(2);

  if (bmi < 18.5) condition = "underweight";
  else if (bmi >= 18.5 && bmi < 24.9) condition = "Healthy";
  else if (bmi >= 24.9 && bmi < 30) condition = "overweight";
  else if (bmi >= 30) condition = "Suffering from Obesity";
  return { bmi, condition };
}
