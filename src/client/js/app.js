

function getInfo(event) {
    getData();
}

async function getData() {
    const location = document.getElementById('location').value;
    const apiUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=Mevans91`;

    console.log(location);
    getGeoData(apiUrl)
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
                    // console.log(pixData.hits[0])
                    postPix({
                        picture: pixData.hits[0]
                    });
                });
                updateUI();
            })
        })
    });

};

async function getGeoData(apiUrl) {
    const response = await fetch(apiUrl);
    console.log(apiUrl);
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
    const lat = localData.latitude;
    const long = localData.longitude;
    const key = await fetch('http://localhost:8081/getKeys');
    const keyData = await key.json();
    const apiKey = keyData.weatherKey;
    const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&units=I&key=${apiKey}`;
    
    console.log(apiUrl)
    const response = await fetch(apiUrl);
    try {
        const newData = response.json();
        // console.log(newData)
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
    }catch(error) {
    console.log("error", error);
    }
};

const getPix = async (location) => {
    const key = await fetch('http://localhost:8081/getKeys');
    const keyData = await key.json();
    const picKey = keyData.pixKey;
    const pixUrl = `https://pixabay.com/api/?key=${picKey}&q=${encodeURIComponent(location)}&image_type=photo&per_page=3`;
    console.log(pixUrl);

    const response = await fetch(pixUrl);
    try {
        const pixData = response.json();
        // console.log(pixData);
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

async function updateUI() {
    const picReq = await fetch('http://localhost:8081/getPic');
    const picData = await picReq.json();
    
    addForecast();
    // document.getElementById('localPic').setAttribute('src', picData.picture.webformatURL);
    // document.getElementById('localPic').setAttribute('class', 'activated');
    
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
        document.getElementById(`day${x+1}`).innerHTML = d.toString().split(' ')[0];
        if( weather[x] === "Overcast clouds") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud');
        } else if (weather[x] === "Scattered clouds" || "Broken clouds" || "Few clouds") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-sun');
        } else if (weather[x] === "Heavy rain") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-showers-heavy');
        } else if (weather[x] === "Light rain" || "Mix snow/rain") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-cloud-rain');
        } else if (weather[x] === "Light snow" || "Heavy snow") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-snowflake');
        } else if(weather[x] === "Clear Sky") {
            document.getElementById(`icon${x+1}`).setAttribute('class', 'fas fa-sun');
        } else {
            console.log('error: no icon');
        }
        
    };
};

export { getInfo }