const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmicalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  var weight = req.body.weight;
  var height = req.body.height;
  var bmi = weight / (height*height);
  res.send("<h1>Your bmi is" + bmi + " </h1>");
});

app.post("/index.html", function (req, res) {
  var num1 = parseFloat(req.body.num1);
  var num2 = parseFloat(req.body.num2);
  var result = Number(num1) + Number(num2);
  res.send("the answer is" + result);
});

app.listen(3000, function () {
  console.log("listening in port 3000 🌎");
});
