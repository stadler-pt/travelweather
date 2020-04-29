import { postData, getSkyData, getPictures, getSensible, getGeo, getData, getCountryData } from "./APIcalls"
import { setImg, imgSlider, timeConverter } from "./style"
import plane from "../img/plane.webp"
import map from "../img/map.jpg"

// Workaround for background images
const backgroundHero = document.getElementsByClassName("hero")[0]
backgroundHero.style.backgroundImage = `url(${plane})`
const backgroundMain = document.getElementsByClassName("main")[0]
backgroundMain.style.backgroundImage = `url(${map})`

const send = (e) => {
    e.preventDefault()
    let text = document.getElementsByClassName("input")[0].value
    text = text.charAt(0).toUpperCase() + text.slice(1)
    const date = document.getElementsByClassName("date")[0].value
    const country = document.getElementById("country").value
    // Check for input
    if (!text || !date || !country) {
        alert("Please provide your destination, country and date")
    } else {
    getSensible("/sensible")
        .then((data) => {
            console.log("data answer: ")
            console.log(data)
            getGeo(data, text, country)
            .then((pass) => {
                if (pass == undefined) {
                    console.log("No data entry for this location!")
                    return pass
                } else { 
                    postData("/postData", {destination: text})
                    getSkyData(pass[1], pass[0], pass[2][3], pass[2][2], date, pass)
                    .then((toPass, pass) => {
                        postData("/postData", {weather: toPass})
                        getCountryData(country, toPass[6][2])
                        .then((result) => {
                            postData("/postData", {country: result[1]})
                            getPictures(result[0][4], result[0][5], text, result[1][0])
                            .then((result) => {
                                postData("/postData", {pictures: result})
                                .then(() => {
                                    getData("/getData")
                                    .then((data) => {
                                        // Content for weather information
                                        document.getElementsByClassName("targetDate")[0].innerHTML = `Date: ${data[data.length-1][1].weather[4]}`
                                        document.getElementsByClassName("targetLocation")[0].innerHTML = `Destination: ${data[data.length-1][0].destination}`
                                        document.getElementsByClassName("targetTimezone")[0].innerHTML = `Timezone: ${data[data.length-1][1].weather[0]}`
                                        document.getElementsByClassName("targetSummary")[0].innerHTML = `Weather summary: ${data[data.length-1][1].weather[1]}`
                                        document.getElementsByClassName("targetMaxTemp")[0].innerHTML = `Estimates Temperature (max): ${Math.round(100 * ((data[data.length-1][1].weather[2] - 32) * 5/9)) / 100}°C`
                                        document.getElementsByClassName("targetLowTemp")[0].innerHTML = `Estimates Temperature (min): ${Math.round(100 * ((data[data.length-1][1].weather[3] - 32) * 5/9)) / 100}°C`
                                        document.getElementsByClassName("targetHumidity")[0].innerHTML = `Estimated Humidity: ${data[data.length-1][1].weather[5]}`
                                        const img = document.getElementsByClassName("targetWeather")[0]
                                        if (data[data.length-1][1].weather.length == 8) {
                                            
                                            let icon = data[data.length-1][1].weather[7]  
                                            img.style.display = "block"
                                            img.setAttribute("src", setImg(icon))
                                        } 
                                        else {
                                            img.style.display = "none"
                                            img.setAttribute("src", "")
                                        }

                                        // Content for country information
                                        const countryInfo = document.getElementsByClassName("countryInfo")[0]
                                        countryInfo.innerHTML = `Country: ${data[data.length-1][2].country[0]}
Capital: ${data[data.length-1][2].country[1]}
Main Currency: ${data[data.length-1][2].country[2]}
Main Language: ${data[data.length-1][2].country[3]}`


                                        // Content for search history
                                        const history = document.getElementsByClassName("history")[0]
                                        history.innerHTML = ""
                                        let searches = document.createElement("DIV")
                                        for (let i = 0; i < data.length; i++) {
                                            let search = document.createElement("DIV")
                                            search.innerHTML = `<pre>${data[i][0].destination}
Date: ${data[i][1].weather[4]}
Temp Max: ${Math.round(100 * (data[i][1].weather[2] - 32) * 5/9) / 100}°C
Temp Min: ${Math.round(100 * (data[i][1].weather[3] - 32) * 5/9) / 100}°C</pre>`
                                            if (data[i][1].weather.length == 8) {
                                                const icon = document.createElement("IMG")
                                                icon.setAttribute("src", setImg(data[i][1].weather[7]))
                                                icon.classList.add("historyImg")
                                                search.appendChild(icon)
                                            }
                                            search.classList.add("historySearch")
                                            searches.classList.add("historyContainer")
                                            searches.appendChild(search)
                                        }
                                        history.appendChild(searches)
                                        
                                        // Content for images
                                        if (data[data.length-1][3].pictures.length == 1) {
                                            let toChange = document.getElementsByClassName("slider")[0]
                                            toChange.setAttribute("src", `${data[data.length-1][3].pictures[0]}`)
                                        }               
                                        imgSlider(data[data.length-1][3].pictures)
                                    })

                                    // Expand content area
                                    .then(() => {
                                        document.getElementsByClassName("main")[0].style.height = "fit-content"
                                        document.getElementsByClassName("main")[0].style.display = "flex"
                                        document.getElementsByClassName("main")[0].scrollIntoView({block: "start", behavior: "smooth"})
                                        })
                                })
                            })
                        })
                    })
                }
            })
        })
    }   
}

export { send }