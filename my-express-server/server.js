const express = require("express");
const app = express();
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

app.get("/contact", function (req, res) {
  res.send("you can contact me at abilashsenth@gmail.com");
});

app.get("/about", function (req, res) {
    res.send("about page");
  });

app.listen(3000, function () {
  console.log("app listening on port 3000");
});
