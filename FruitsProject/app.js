const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser:true});

//we create a schema for every document
const fruitsSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Why no name"]
    },
    rating:{
        type:Number,
        min:1,
        max:10
    },
    review: String
});

const peopleSchema = new mongoose.Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    }
});

//use schema to create mongoose "model"

const Fruit = mongoose.model("Fruit", fruitsSchema );
const People = mongoose.model("People", peopleSchema);

const peach = new Fruit({
    rating:10,
    review:"amazing"
});
//peach.save();
//create a fruit
// const fruit = new Fruit({
//     name: "Apple",
//     rating: 7,
//     review: "Apples are good"
// });


// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully logged to fruits db");
//     }
// });

Fruit.deleteOne({name:"Peaches"}, function(err){
    if(err){
        console.log(err);
    }
});

Fruit.find(function(err, fruits){
    
    if(err){
        console.log(err);
    }else{
        for(var i =0; i<fruits.length;i++){
            console.log(fruits[i].name);
        }
    }
});

People.deleteMany({name:"john"}, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("johns deleted successfully");
    }
});


