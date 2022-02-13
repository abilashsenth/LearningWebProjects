const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", 'ejs');
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });
const articleSchema = new mongoose.Schema({
  title:String, 
  content:String
});

const Article = mongoose.model("Article", wikiSchema);

const wiki1 = new Wiki({
  title:"hello",
  content:"World"
});

wiki1.save();


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
