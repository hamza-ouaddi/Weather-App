const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

const https = require("node:https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "d860141b8dd27eee7d374c849222f32d";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    console.log("Status Code: ", response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const iconLink =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      res.write(
        "<h1>The temperature in " + query + " is " + temp + " degrees.</h1>"
      );
      res.write("<h2>Description: " + weatherDescription + ".</h2>");
      res.write("<img src=" + iconLink + ">");
      res.send();
    });
  });
});

app.listen(port, function () {
  console.log("Server is running on port " + port);
});

/*
  
  */
