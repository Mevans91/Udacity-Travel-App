function getInfo(event) {
    getGeo();
}

async function getGeo() {
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
            callWeather(localData);
        })
    });

}

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
    const apiKey = process.env.WEATHER_KEY;
    const startDate = document.getElementById('departure').value;
    const endDate = document.getElementById('returnDate').value;
    const lat = localData.latitude;
    const long = localData.longitude;
    const apiUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;

    console.log(apiUrl);
    console.log(apiKey);
    const response = await fetch(apiUrl);
    try {
        const newData = response.json();
        console.log(newData)
    } catch (error) {
        console.log('error from Weatherbit', error);
    }
};

export { getInfo }