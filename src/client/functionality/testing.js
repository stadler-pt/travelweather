const testing = (icon) => {
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

export { testing }