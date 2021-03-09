function getGeo(event) {
    const location = document.getElementById('location').value;
    const apiUrl = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=Mevans91`;

    console.log(location);
    getGeoData(apiUrl)
    .then(function(data) {
        console.log(data);
        postData({
            latitude: data.lat,
            longitude: data.lng
        });
        updateUI();
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

export { getGeo }