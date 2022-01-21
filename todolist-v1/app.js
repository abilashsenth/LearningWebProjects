const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js")

const app = express();
var items = ["buy food", "cook food", "eat food"];
var workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
 
  const day = date.getDate();
  res.render("list", { listTitle: day, items: items });
});

app.post("/", function (req, res) {
  if(req.body.button === "Work"){
    workItems.push(req.body.action);
    res.redirect("/work");
  }else{
    items.push(req.body.action);
    res.redirect("/");
  }
  
});

app.get("/work", function(req, res){
  res.render("list", {listTitle:"Work", items:workItems})
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function () {
  console.log("listening on port 3000👂");
});
