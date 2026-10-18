import { getProcessedWeather } from "./logic.js"

import clearDay from "../images/icons/clear-day.png"
import clearNight from "../images/icons/clear-night.png"
import partlyCloudyDay from "../images/icons/partly-cloudy.png"
import partlyCloudyNight from "../images/icons/partly-cloudy-night.png"
import rainy from "../images/icons/rainy.png"
import thunderstorm from "../images/icons/thunderstorm.png"
import snow from "../images/icons/snow.png"
import fog from "../images/icons/fog.png"
import wind from "../images/icons/wind-cloud.png"
import cloudy from "../images/icons/cloudy.png"

import windspeedIcon from "../images/icons/wind.png"
import humidityWaterIcon from "../images/icons/humidity.png"

import darkLight from "../images/icons/brightness.png"

const icons = {
    "clear-day": clearDay,
    "clear-night": clearNight,
    "cloudy": cloudy,
    "partly-cloudy-day": partlyCloudyDay,
    "partly-cloudy-night": partlyCloudyNight,
    "rain": rainy,
    "thunder-rain": thunderstorm,
    "thunder-showers-day": thunderstorm,
    "thunder-showers-night": thunderstorm,
    "snow": snow,
    "fog": fog,
    "wind": wind,
};

const content = document.querySelector(".content")

function loadWeather(icon, temp, windspeed, uv, humidity, condition) {
    content.innerHTML = ""

    const mainDiv = document.createElement("div")
    mainDiv.classList.add("main-div")

    const domicon = document.createElement("img")
    domicon.classList.add("icon")
    const iconImage = icons[icon]
    domicon.src = iconImage

    const tempBox = document.createElement("div")
    tempBox.classList.add("temp-box")

    const domTemp = document.createElement("div")
    domTemp.classList.add("temp")
    domTemp.textContent = `Temp: ${temp}°`

    const tempChange = document.createElement("button")
    tempChange.classList.add("temp-change")
    tempChange.textContent = "C"

    tempChange.addEventListener("click", ()=>{
        if (tempChange.textContent === "C") {
            temp = ((temp*1.8) + 32).toFixed(1)
            domTemp.textContent = domTemp.textContent = `Temp: ${temp}°`
            tempChange.textContent = "F"
        } else if(tempChange.textContent === "F") {
            temp = ((temp-32) / 1.8).toFixed(1)
            domTemp.textContent = domTemp.textContent = `Temp: ${temp}°`
            tempChange.textContent = "C"
        }
    })

    tempBox.append(domTemp, tempChange)

    const windBox = document.createElement("div")
    windBox.classList.add("wind-box")

    const windIcon = document.createElement("img")
    windIcon.classList.add("wind-icon")
    windIcon.src = windspeedIcon

    const domWindspeed = document.createElement("div")
    domWindspeed.classList.add("windspeed")
    domWindspeed.textContent = `: ${windspeed}m/s`

    windBox.append(windIcon, domWindspeed)

    mainDiv.prepend(domicon, tempBox, windBox)

    const mainDiv2 = document.createElement("div")
    mainDiv2.classList.add("main-div2")

    const domUv = document.createElement("div")
    domUv.classList.add("uv")
    domUv.textContent = `UV Index: ${uv}`

    const humidityBox = document.createElement("div")
    humidityBox.classList.add("humidity-box")

    const domHumidity = document.createElement("div")
    domHumidity.classList.add("humidity")
    domHumidity.textContent = `: ${humidity}%`

    const humidityIcon = document.createElement("img")
    humidityIcon.classList.add("humidity-icon")
    humidityIcon.src = humidityWaterIcon

    humidityBox.append(humidityIcon, domHumidity)

    mainDiv2.append(domUv, humidityBox)

    const domCondition = document.createElement("p")
    domCondition.classList.add("condition")
    domCondition.textContent = condition

    content.prepend(mainDiv, mainDiv2, domCondition)
}

const form = document.querySelector("form")
const errorMsg = document.querySelector(".error")
const locationInput = document.querySelector("#locationInput")

function searchWeather() {
    errorMsg.textContent = "";

    getProcessedWeather(locationInput.value)
        .then(data => {
            loadWeather(data.icon, data.temp, data.windspeed, data.uvIndex, data.humidity, data.conditions);
        })
        .catch(() => {
            errorMsg.textContent = "Please input a valid city.";
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchWeather();
});

locationInput.addEventListener("blur", ()=>{
    if (content.innerHTML === "") {
        searchWeather()
    }
});

const themeButton = document.querySelector("#themeButton")

const themeImg = document.createElement("img")
themeImg.classList.add("theme-img")
themeImg.src = darkLight

themeButton.append(themeImg)

themeButton.addEventListener("click", ()=>{
    document.body.classList.toggle("dark")
})


export { loadWeather }