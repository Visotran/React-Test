import weatherCodes from "../data/weathercodes";

export function formatTemperature(temperature) {
  return temperature.toString().replace(".", ",");
}

export function formatWeatherCodeText(weatherCode) {
  if (typeof weatherCode !== "number") {
    return "";
  }
  return weatherCodes[weatherCode].text;
}

export function formatWeatherCodeImg(weatherCode, isDay) {
  if (typeof weatherCode !== "number") {
    return "/weather/loading.png";
  }
  
  if (isDay) {
    return weatherCodes[weatherCode].iconDay;
  } else {
    return weatherCodes[weatherCode].iconNight;
  }
}