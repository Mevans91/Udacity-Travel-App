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


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.post('/getPic', function (req, res) {
    const API_KEY = process.env.PIX_KEY;
    const textUrl = req.body.textUrl;
    const apiUrl = "https://pixabay.com/api/";
    const params = `?key=${API_KEY}&q=`; //need to finish later with input
    const fetchUrl = apiUrl + params;

    console.log(fetchUrl);

    fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON",
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

app.post('/getWeather', function (req, res) {
    const API_KEY = process.env.WEATHER_KEY;
    const textUrl = req.body.textUrl;
    const apiUrl = "https://api.weatherbit.io/v2.0/history/daily";
    const params = `?key=${WEATHER_KEY}&q=`; //need to finish later with input
    const fetchUrl = apiUrl + params;

    console.log(fetchUrl);

    fetch(fetchUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/JSON",
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
