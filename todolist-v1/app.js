const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  const date = new Date();

  var options = { weekday: "long", day: "numeric", month: "long" };
  var day = date.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, items: items });
});

app.post("/", function (req, res) {
  items.push(req.body.action);
  res.redirect("/");
});

app.listen(3000, function () {
  console.log("listening on port 3000👂");
});
