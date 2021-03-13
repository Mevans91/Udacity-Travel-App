

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
                    console.log(pixData.hits[0])
                    postPix({
                        picture: pixData.hits[0]
                    });
                })
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

const updateUI = async (url = 'http://localhost:8081/addGeo') => {
    const request = await fetch(url);
    try {
       const allData= await request.json();
    //    console.log(allData);
       document.getElementById('latitude').innerHTML = allData.latitude;
       document.getElementById('longitude').innerHTML = allData.longitude;
    } catch (error) {
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

export { getInfo }