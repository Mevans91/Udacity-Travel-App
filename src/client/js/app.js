import 'regenerator-runtime/runtime';
/** 
 * regenerator-runtime had to be imported, as babel's polyfill has been depreciated.
 */


function getInfo(event) {
    getData();
    addCountdown();
}

/**
 * getData is fairly straight forward, it goes through each API and pulls the necessary
 * data. It then saves that data to the appropriate endpoints on the server side, until it
 * gets down to the updateUI, where the endpoints are called and the html is updated with the 
 * formatted data.
 */
async function getData() {
    const location = document.getElementById('location').value;

    getGeoData(location)
    .then(function(data) {
        postData({
            latitude: data.geonames[0].lat,
            longitude: data.geonames[0].lng
        });
        getCoordinates()
        .then(function(localData) {
            callWeather(localData)
            .then(function(newData) {         
                postWeather({
                    day1: newData.data[1],
                    day2: newData.data[2],
                    day3: newData.data[3],
                    day4: newData.data[4],
                    day5: newData.data[5],
                    day6: newData.data[6],
                    day7: newData.data[7],
                    day8: newData.data[8],
                    day9: newData.data[9],
                    day10: newData.data[10],
                    day11: newData.data[11],
                    day12: newData.data[12],
                    day13: newData.data[13],
                    day14: newData.data[14],
                });
                getPix(location)
                .then(function(pixData) {
                    postPix({
                        picture: pixData.hits[0]
                    });
                    updateUI(location);
                });
            });
        });    
    });
};

async function getGeoData(location) {
    const keysData = await fetch('http://localhost:8081/getKeys');
    const keys = await keysData.json();
    const geoKey = keys.geoKey;
    const apiUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geoKey}`;
    const response = await fetch(apiUrl);

    try {
        const data = response.json();
        return data;
    } catch (error) {
        console.log('error from geonames', error);
    }
};

const postData = async (data = {})=>{
    const response = await fetch('http://localhost:8081/getGeo', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify(data),        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
};

const getCoordinates = async (url = 'http://localhost:8081/addGeo') => {
    const response = await fetch(url);
    try {
        const localData = response.json();
        return localData;
    } catch (error) {
        console.log('error from geoData endpoint', error);
    }
};

const callWeather = async (localData) => {
    const keysData = await fetch('http://localhost:8081/getKeys');
    const keys = await keysData.json();
    const apiKey = keys.weatherKey;
    const lat = localData.latitude;
    const long = localData.longitude;
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&units=I&key=${apiKey}`;
    const response = await fetch(apiUrl);

    try {
        const newData = response.json();
        return newData;
    } catch (error) {
        console.log('error from Weatherbit', error);
    }
};

const postWeather = async (newData = {})=>{
    const response = await fetch('http://localhost:8081/saveWeather', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify(newData),        
  });

    try {
      const wData = await response.json();
      return wData
    } catch(error) {
        console.log("error", error);
    }
};

const getPix = async (location) => {
    const keysData = await fetch('http://localhost:8081/getKeys');
    const keys = await keysData.json();
    const picKey = keys.pixKey;
    const pixUrl = `https://pixabay.com/api/?key=${picKey}&q=${encodeURIComponent(location)}&image_type=photo&per_page=3`;

    const response = await fetch(pixUrl);
    try {
        const pixData = response.json();
        return pixData;
    } catch (error) {
        console.log('error from Pixabay', error);
    }
};

const postPix = async (pixData = {})=>{
    const response = await fetch('http://localhost:8081/savePic', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify(pixData),        
  });

    try {
      const pData = await response.json();
      return pData
    }catch(error) {
    console.log("error", error);
    }
};

//updateUI pushes data to the html view and switches classes on certain elements to activate sections or hide unnecessary ones
async function updateUI(location) {
    const picReq = await fetch('http://localhost:8081/getPic');
    const picData = await picReq.json();

    addForecast();
    document.getElementById('localPic').setAttribute('src', picData.picture.webformatURL);
    document.getElementById('localPic').setAttribute('class', 'activated');
    document.getElementById('forecast').setAttribute('class', 'tableOn');
    document.getElementById('message').setAttribute('class', 'forGreeting');
    document.getElementById('onWay1').innerHTML = `You'll be on your way to ${location} in`;
    document.getElementById('pre-container').setAttribute('class', 'inactive');
    document.getElementById('post-container').setAttribute('class', 'post-container');
    document.getElementById('resultSquare').setAttribute('class', 'results');
    document.getElementById('planner').setAttribute('class', 'topTitle2');
    document.getElementById('col2').setAttribute('class', 'column2');
    document.getElementById('col1').setAttribute('class', 'column1');
    document.getElementById('planner').setAttribute('class', 'topTitle2');
    
    
};

const addForecast = async (url = 'http://localhost:8081/getWeather') => {
    const weatherReq = await fetch(url);
    const weatherData = await weatherReq.json();
    const day1 = weatherData.day1.datetime;
    const day2 = weatherData.day2.datetime;
    const day3 = weatherData.day3.datetime;
    const day4 = weatherData.day4.datetime;
    const day5 = weatherData.day5.datetime;
    const day6 = weatherData.day6.datetime;
    const day7 = weatherData.day7.datetime;
    const day8 = weatherData.day8.datetime;
    const day9 = weatherData.day9.datetime;
    const day10 = weatherData.day10.datetime;
    const day11 = weatherData.day11.datetime;
    const day12 = weatherData.day12.datetime;
    const day13 = weatherData.day13.datetime;
    const day14 = weatherData.day14.datetime;
    const now = new Date();
    let days = [day1, day2, day3, day4, day5, day6, day7, 
        day8, day9, day10, day11, day12, day13, day14
    ];
    let weather = [weatherData.day1.weather.description, 
        weatherData.day2.weather.description, weatherData.day3.weather.description, 
        weatherData.day4.weather.description, weatherData.day5.weather.description,
        weatherData.day6.weather.description, weatherData.day7.weather.description,
        weatherData.day8.weather.description, weatherData.day9.weather.description,
        weatherData.day10.weather.description, weatherData.day11.weather.description,
        weatherData.day12.weather.description, weatherData.day13.weather.description,
        weatherData.day14.weather.description
    ];
    console.log(weather);

    for (let x = 0; x < 14; x++){
        let d = new Date(days[x]);
        console.log(d);
        document.getElementById(`day${x+1}`).innerHTML = d.toString().split(' ')[0]+' '+d.getDate();
        
        let description = weather[x];

        //This function cycles through all possible weather conditions and assigns appropriate icons to represent them

        switch(description) {
            case "Overcast clouds":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud icon');
                break;
            case "Scattered clouds":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-sun icon');
                break;
            case "Broken clouds":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-sun icon');
                break;
            case "Few clouds":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-sun icon');
                break;
            case "Heavy rain":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-showers-heavy icon');
                break;
            case "Light shower rain":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-rain icon');
                break;
            case "Light rain":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-rain icon');
                break;
            case "Moderate rain":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-rain icon');
                break;
            case "Mix snow/rain":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-rain icon');
                break;
            case "Light snow":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-snowflake icon');
                break;
            case "Heavy snow":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-snowflake icon');
                break;
            case "Clear Sky":
                document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-sun icon');
                break;
            default:
                console.log('error: no icon');
        };
        
    };
};

function addCountdown(){
    const departure = document.getElementById('departure').value;
    const countDownDate = new Date(departure).getTime();
    
    // Updates the count down every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const date = new Date();
        const localOffset = (-1) * date.getTimezoneOffset() * 60000;
        //localOffset adjusts UTC time to CMT time

        // Find the distance between now and the count down date
        const distance = (countDownDate - now) - localOffset;
      
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s";
      
        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("countdown").innerHTML = "IT'S TIME!";
        }
    }, 1000);
};

function addButtonFunction (){
    document.getElementById('submission').addEventListener('click', getInfo);
};
export { getInfo, addButtonFunction }