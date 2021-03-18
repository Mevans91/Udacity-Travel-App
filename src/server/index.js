const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express()

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let geoData = {};
let apiKeys = {
    weatherKey: process.env.WEATHER_KEY,
    pixKey: process.env.PIXABAY_KEY,
    geoKey: process.env.GEO_USERNAME
};
let weatherData = {};
let pixData = {};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

app.get('/getKeys', function(request, response){
    response.send(apiKeys);
});

app.get('/addGeo', function(request, response){
    response.send(geoData);
});

app.post('/getGeo', function(request, response) {
    geoData = {
        latitude: request.body.latitude,
        longitude: request.body.longitude
    };
});

app.post('/saveWeather', function(request, response) {
    weatherData = {
        day1: request.body.day1,
        day2: request.body.day2,
        day3: request.body.day3,
        day4: request.body.day4,
        day5: request.body.day5,
        day6: request.body.day6,
        day7: request.body.day7,
        day8: request.body.day8,
        day9: request.body.day9,
        day10: request.body.day10,
        day11: request.body.day11,
        day12: request.body.day12,
        day13: request.body.day13,
        day14: request.body.day14,
    };
});

app.get('/getWeather', function (request, response) {
    response.send(weatherData);
});

app.post('/savePic', function(request, response) {
    pixData = {
        picture: request.body.picture
    };
});

app.get('/getPic', function(request, response) {
    response.send(pixData);
});
