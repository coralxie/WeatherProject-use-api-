const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "f51dd7250869c7b0a8d7b10ea8494857";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const WeatherCode = JSON.parse(data);
            const temp = WeatherCode.main.temp;
            const weatherDescription = WeatherCode.weather[0].description
            const icon = WeatherCode.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<H1>The weather in " + query + " is " + temp + " degrees</H1>");
            res.write("<p>Tht weather is currently " + weatherDescription + " <p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000")
});