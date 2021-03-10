function getPix(event) {
    event.preventDefault()

    console.log("getPix started")
    fetch('http://localhost:8081/getPic', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: JSON.stringify({
            
        // })
    })
    .then(res => res.json())
    .then(function (res) {
        console.log('response from /getPix:', res);
    })
}

export { getPix }
