// Weather icons
const setImg = (icon) => {
    let iconValue
    if (icon == "clear-day" || icon == "clear-night" || icon == "clear") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/51/weather-3440566_960_720.png"}
    else if (icon == "fog" || icon == "cloudy" || icon == "partly-cloudy-day" || icon == "partly-cloudy-night") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/48/weather-3440560_960_720.png"}
    else if (icon == "rain") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/48/weather-3440565_960_720.png"}
    else if (icon == "snow") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/51/weather-3440567_960_720.png"}
    else if (icon == "wind") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/51/weather-3440569_960_720.png"}
    else if (icon == "sleet") {iconValue = "https://cdn.pixabay.com/photo/2018/05/30/02/48/weather-3440561_960_720.png"}
    else {return false}
    return iconValue
}

// Collapsible search history
const collapse = document.getElementsByClassName("collapse")[0]
const history = document.getElementsByClassName("history")[0]
collapse.addEventListener("click", () => {
    if (history.offsetWidth > 20) {
        history.style.width = "10px"
    }
    else {history.style.width = "100%"} 
})

// Convert unix to date
const timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + '. of ' + month + ' ' + year;
    return time;
}

// Slider
const imgSlider = (data) => {
    let toChange = document.getElementsByClassName("slider")[0]
    let pictures = [data[0], data[1], data[2], data[3], data[4]]
    let prev = document.getElementsByClassName("prev")[0]
    let next = document.getElementsByClassName("next")[0]
    let count = 0  
    toChange.setAttribute("src", `${pictures[count]}`)
    next.style.display = "block"
    prev.style.display = "block"
    next.addEventListener("click", () => {
        count < 4 ? count++ : count = 0
        toChange.setAttribute("src", `${pictures[count]}`)
    })
    prev.addEventListener("click", () => {
        count > 0 ? count-- : count = 4
        toChange.setAttribute("src", `${pictures[count]}`)
    })
}

window.addEventListener("resize", () => {
    if (window.innerWidth <= 600) {
        history.style.width = "100%"
    }
})

export { timeConverter, imgSlider, setImg }