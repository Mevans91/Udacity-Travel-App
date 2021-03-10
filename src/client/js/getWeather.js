function addWeather() {
    const url = 'http://localhost:8081/addGeo';

    getCoordinates(url)
    .then(function(data){
        callWeather(data);
    })
}

// const getCoordinates = async (url = 'http://localhost:8081/addGeo') => {
//     const request = await fetch(url);
//     try {
//        const allData= await request.json();
//         const lat = allData.latitude;
//         const long = allData.longitude;
//     } catch (error) {
//        console.log("error", error);
//     }
// };

async function getCoordinates(url) {
    const response = await fetch(url);
    try {
        const data = response.json();
        return data;
    } catch (error) {
        console.log('error from geoData endpoint', error);
    }
};

const callWeather = async (data) => {
    const apiKey = process.env.WEATHER_KEY;
    const startDate = document.getElementById('departure').value;
    const endDate = document.getElementById('returnDate').value;
    const lat = data.latitude;
    const long = data.longitude;
    const apiUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;


    console.log(apiKey);
    const response = await fetch(apiUrl);
    try {
        const newData = response.json();
        console.log(newData)
    } catch (error) {
        console.log('error from Weatherbit', error);
    }
};

// async function callWeather() {
//     const geoUrl = 'http://localhost:8081/addGeo';
//     // const apiUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=API_KEY`;
    
//     const response = await fetch(geoUrl);

//     try {
//         const data = response.json();
//         console.log(data.main.latitude);
//         const lat = data.latitude;
//         const long = data.longitude;
//         const apiUrl = `https://api.weatherbit.io/v2.0/history/daily?lat=${lat}&lon=${long}&start_date=${startDate}&end_date=${endDate}&key=${apiKey}`;

//         const res = await fetch(apiUrl);
//         try {
//             const newData = res.json();
//             console.log(newData);
//         } catch (error) {
//             console.log('error with new data', error);
//         }

//     } catch (error) {
//         console.log('error from WeatherBit', error);
//     }


// };

export { addWeather }