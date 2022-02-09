//jshint esversion:6
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

//schema for todolist item
const itemsSchema = {
  name: {
    type: String,
  },
};

//mongoose model
const Item = mongoose.model("item", itemsSchema);

//create three new items

const item1 = new Item({
  name: "welcome to todo list",
});

const item2 = new Item({
  name: "Click + to add the item",
});

const item3 = new Item({
  name: "<-- click here to delete item",
});

const defaultItems = [item1, item2, item3];

//list schema
const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("list", listSchema);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        //Items collection is empty
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log("saved to db");
          }
        });
        res.redirect("/");
      } else {
        //default items already present
        res.render("list", {
          listTitle: "Today",
          newListItems: foundItems,
        });
      }
    }
  });
});

app.get("/:customListName", function (req, res) {
  const customListName = req.params.customListName;

  List.find({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (foundList.length === 0) {
        console.log("creating new list");
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
      } else {
        //list found
        // res.render("list", {
        //   listTitle: foundList.name,
        //   newListItems: foundList,
        // });
        console.log(foundList);
      }
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const itemId = req.body.checkbox;
  Item.deleteOne({ _id: itemId }, function (err) {
    if (!err) {
      console.log("item deleted");
    }
  });
  res.redirect("/");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
