const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName;
  const appId = "bc12083e70d2d22298c2df1cec7101d9";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appId +
    "&units=" +
    unit +
    "";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconURL =
        "http://openweathermap.org/img/wn/" +
        weatherData.weather[0].icon +
        "@2x.png";
      console.log(iconURL);

      res.write("<h1>the temperature in "+ query +" is " + temp + "</h1>");
      res.write("<p> the weather feels " + weatherDescription + "</p>");
      res.write('<img src = "' + iconURL + '">');
      res.send();
    });
  });
});
 

app.listen(3000, function () {
  console.log("Server started, listening in port 3000 ✨");
});


