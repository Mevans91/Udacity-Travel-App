const dotenv = require('dotenv');
dotenv.config();

var path = require('path');
const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Geonames } = require('geonames.js')


const app = express()

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

let geoData = {};
let apiKeys = {
    weatherKey: process.env.WEATHER_KEY,
    pixKey: process.env.PIXABAY_KEY
};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/getKeys', function(request, response){
    response.send(apiKeys);
    console.log(apiKeys);
});

app.post('/getPic', function (req, res) {
    const PIX_KEY = "20375948-3b9ccc2d78e6a17d1a7bb3c71";
    const pixUrl = `https://pixabay.com/api/?key=${PIX_KEY}&q=${location}&image_type=photo`;
    const location = document.getElementById('location').value;
    const departure = document.getElementById('departure').value;
    const returnDate = document.getElementById('returnDate').value;

    console.log(pixUrl);

    fetch(pixUrl)
    .then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data)
        // res.send({
        //     picture: data.webformatUrl
        // })
    });
})

app.get('/getWeather', function (req, res) {
    const weatherKey = process.env.WEATHER_KEY;
    const lat = geoData.latitude;
    const long = geoData.longitude;
    const startDate = document.getElementById('departure').value;
    const endDate = document.getElementById('returnDate').value;
    const fetchUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=${weatherKey}`

    console.log(fetchUrl);

    fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON",
            "Accept": "application/JSON"
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        res.send({
            score_tag: data.score_tag,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony,
        })
    });
})

app.get('/addGeo', function(request, response){
    response.send(geoData);
});

app.post('/getGeo', function(request, response) {
    geoData = {
        latitude: request.body.latitude,
        longitude: request.body.longitude
    };
})

// app.post('/addPic', function(request, response) {
//     projectData = {
//       picture: request.body.webformatUrl
//     }
//   });