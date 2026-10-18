
import { loadWeather } from "./display.js";



async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=J3VNW7TZPHFMU9ELYG36TX3ZS&unitGroup=metric`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

async function getProcessedWeather(city) {
    const data = await getWeather(city)
    const processedData = {}

    processedData.icon = data.currentConditions.icon || "not working"
    processedData.temp = data.currentConditions.temp
    processedData.windspeed = (data.currentConditions.windspeed/3.6).toFixed(1)
    processedData.uvIndex = data.currentConditions.uvindex
    processedData.humidity = data.currentConditions.humidity
    processedData.conditions = data.currentConditions.conditions
    return processedData
} 



export { getProcessedWeather }