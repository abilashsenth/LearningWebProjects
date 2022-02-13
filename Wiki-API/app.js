const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

const wiki1 = new Article({
  title: "hello",
  content: "World",
});

//wiki1.save();

//request targeting all articles

app
  .route("/articles")
  .get(function (req, res) {
    Article.find({}, function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      }
    });
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle.save(function (err) {
      if (!err) {
        res.send("successfully added a new article");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("there seems to be an error");
        console.log(err);
      } else {
        res.send("succcessfully deleted all the documents");
      }
    });
  });

//request targeting specific article
app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle }, function (err, foundArticle) {
      if (!err) {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("Oops, Article not found");
        }
      }
    });
  })
  .put(function (req, res) {
    const articleTitle = req.params.articleTitle;
  
    Article.findOneAndUpdate(
      { title: articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err, result) {
        if (!err) {
          res.send("document updated");
          console.log("doccument updated" + result);
        } else {
          console.log(err);
        }
      }
    );
  })
  .patch(function(req, res){
    const articleTitle = req.params.articleTitle;
    Article.findOneAndUpdate(
      { title: articleTitle },
      { $set:{title: req.body.title, content: req.body.content }},
      function (err, result) {
        if (!err) {
          res.send("document updated");
          console.log("doccument updated" + result);
        } else {
          console.log(err);
        }
      }
    );
  })
  .delete(function(req, res){
    const articleTitle = req.params.articleTitle;
    Article.deleteOne({title:articleTitle}, function(err){
      if(!err){
        res.send("document successfully deleted");
      }
    });
  });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
