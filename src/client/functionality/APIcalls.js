import { timeConverter } from "./style"

// get Api data
const getSensible = async (url = "") => { 
    const res = await fetch(url);
    try {
        const data = await res.json()
        return data
    }
    // Errorhandler
    catch(error) {
        console.log("Error getting data: ", error);
    }
}

// get Geonames data
const getGeo = async (source, text, country) => {   
    const res = await fetch(`${source[1]}${text}&country=${country}&radius=10&username=${source[0]}`)
    try {
        const data = await res.json();
        if ("status" in data || data.postalCodes.length == 0) {
            alert("Sorry, there seems to be an issue with the search")
        } else {
            createNew("/createNew", {})
            const pass = [data.postalCodes[0].lng, data.postalCodes[0].lat, source]
            return (pass);
        }
    }
    // Errorhandler
    catch(error) {
        console.log("Error:", error);
    }
}

// initialize new entry in data array
const createNew = async ( url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },      
        body: JSON.stringify(data)
    })
}

// get Restcountries data
const getCountryData = async (country, pass) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${country}?fields=name;capital;currencies;languages`)
    try {
        const data = await res.json();
        const toPass = [data.name, data.capital, data.currencies[0].name, data.languages[0].name]
        const result = [pass, toPass]
        return (result)
    }
    // Errorhandler
    catch(error) {
        console.log("Error:", error);
    }
}

// get Darksky data
const getSkyData = async (lat, lng, urlSky, keySky, date, pass) => {   
    const res = await fetch(`${urlSky}${keySky}/${lat},${lng},${date}T12:00:00Z?`)
    try {
        const data = await res.json();
        let targetDate = timeConverter(data.daily.data[0].time)
        let toPass = [data.timezone, data.daily.data[0].summary, data.daily.data[0].temperatureHigh, data.daily.data[0].temperatureLow, targetDate, data.daily.data[0].humidity, pass]
        if (data.daily.data[0].summary == null) {toPass[1] = "No information available"}
        if (data.daily.data[0].icon) {toPass.push(data.daily.data[0].icon)}
        return toPass
    }
    // Errorhandler
    catch(error) {
        console.log("Error:", error);
    }
}

// get Pixabay data
const getPictures = async (key, url, search, name) => {
    const searchCorrect = search.replace(" ", "%20")
    const nameCorrect = name.replace(" ", "%20")
    const res = await fetch(`${url}${key}&q=${searchCorrect}`)
    try {
        const data = await res.json();
        if (data.hits.length >= 5) {
            let result = [data.hits[0].webformatURL, data.hits[1].webformatURL, data.hits[2].webformatURL, data.hits[3].webformatURL, data.hits[4].webformatURL]
            return result
        } else if (data.hits.length < 5 && data.hits.length > 0) {
            let result = [data.hits[0].webformatURL]
            document.getElementsByClassName("prev")[0].style.display = "none"
            document.getElementsByClassName("next")[0].style.display = "none"
            return result
        } else {
            const res = await fetch(`${url}${key}&q=${nameCorrect}`)
            try {
                const data = await res.json();
                let result = [data.hits[0].webformatURL, data.hits[1].webformatURL, data.hits[2].webformatURL, data.hits[3].webformatURL, data.hits[4].webformatURL]
                return result
            }
            finally {console.log("done")}           
        }
    }
    // Errorhandler
    catch(error) {
        console.log("Error:", error);
    }
}    

// send data to data array
const postData = async ( url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },      
        body: JSON.stringify(data)
    })
}

// get data from data array
const getData = async (url = "") => { 
    const res = await fetch(url);
    try {
        const data = await res.json()
        return data
    }
    // Errorhandler
    catch(error) {
        console.log("Error getting data: ", error);
    }
}

export { postData, getSkyData, getPictures, getSensible, getGeo, getData, getCountryData }