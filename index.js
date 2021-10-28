const authorName = document.getElementById("author")
const cryptoPrice = document.getElementById("cryptoPrice")
const crypto = document.getElementById("cryptoName")

function displayTime (){
    const time = new Date();
    document.getElementById("showTime").innerHTML = time.toLocaleTimeString("en-us",{timestyle: "short"})
}

setInterval(displayTime, 1000)


fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(response => response.json())
.then(data => {
    console.log(data)
    document.body.style.backgroundImage = `url(${data.urls.full})`
    authorName.textContent =`By: ${data.user.name}`
})

.catch(err =>{
    document.body.style.backgroundImage = `url("https://images.unsplash.com/photo-1518534249708-e8f3537753ee?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzUzMTY0MTQ&ixlib=rb-1.2.1&q=85")`
    authorName.textContent =`By: An Artist`
}) 


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(response => {
    if(!response.ok){
        throw Error("SOMETHING WENT WRONG")
    }
    return response.json()
})
.then(data => {
    console.log(data.id)
    console.log(data)
    crypto.innerHTML =`
    <img src=${data.image.small} />
    <span>${data.name}</span>
    `
    cryptoPrice.innerHTML += ` 
    <p>Current price: $${data.market_data.current_price.usd}</p>
    <p>Low Price: $${data.market_data.low_24h.usd}</p>
    <p>High Price: $${data.market_data.high_24h.usd}</p>
    `
})
.catch(err => console.log(err))

var options= {
    enableHighAccuracy: true,
    maximumAge:0,
    timeout:5000
}

function success(position){
    var location = position.coords

    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric`)
    .then(response => {
        if(!response.ok){
            throw Error("weather data not available")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        const temperature =Math.floor(`${data.main.temp}`)
        document.getElementById("weather").innerHTML = `
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        <span>${temperature}°</span>
        `
        document.getElementById("weather-content").innerHTML=`<p>${data.name}</p>`
        console.log(temperature)
    })
    .catch(err=> console.error(err))
}

function error(err){
    console.warn(`Error(${err.code}): ${err.message}`)
}

navigator.geolocation.getCurrentPosition(success, error, options);