import weatherCodes from "../data/weathercodes";

export function formatTemperature(temperature) {
  return temperature.toString().replace(".", ",");
}

export function formatTemperatureRounded(temperature) {
  console.log(temperature)
  return temperature.toFixed(0).toString().replace(".", ",");
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

export function formatDate(date) {
  const [month, day] = date.split("-");
  return `${day}.${month}.`;
}

export function degreesToDirection(degrees) {
  const WIND_DIRECTIONS = [
    "N",
    "NNO",
    "NO",
    "ONO",
    "O",
    "OSO",
    "SO",
    "SSO",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
  ];
  // Sektor bestimmen
  const index = Math.round(degrees / 22.5) % 16;

  return WIND_DIRECTIONS[index];
}