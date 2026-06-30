import "./TomorrowWeather.css";
import WeatherCard from "../WeatherCard";
import {formatTemperatureRounded, formatDecimal, formatWeatherCodeImg, formatWeatherCodeText, secondsSinceMidnight} from "../utils/formating";
import uvIndices from "../data/uv";
import { useMemo } from "react";

function TomorrowWeather({weatherData}) {
  
  //Icon Pfad speichern
  const icon = useMemo(() => {
    return formatWeatherCodeImg(weatherData?.daily?.weather_code[1], 1);
  }, [weatherData]);
  
  return (
    <div className="tomorrow-container">
      <WeatherCard className="small-card" title="Allgemein">
        <img className="tomorrow-general-icon" src={icon}/>
        <span className="tomorrow-normal-text">{formatWeatherCodeText(weatherData?.daily?.weather_code[1])}</span>
      </WeatherCard>
      <WeatherCard className="small-card" title="Temperaturen">
        <div className="tomorrow-temperature-element">
          <span className="tomorrow-normal-text">Temperatur</span>
          <span className="tomorrow-normal-text">gefühlt</span>
        </div>
        <div className="tomorrow-temperature-element">
          <span className="tomorrow-normal-text"><span className="arrow-symbol">&#8595;</span>{weatherData?.daily?.temperature_2m_min[1]}°C</span>
          <span className="tomorrow-normal-text">{weatherData?.daily?.apparent_temperature_min[1]}°C</span>
        </div>
        <div className="tomorrow-temperature-element">
          <span className="tomorrow-normal-text"><span className="arrow-symbol">&#8593;</span>{weatherData?.daily?.temperature_2m_max[1]}°C</span>
          <span className="tomorrow-normal-text">{weatherData?.daily?.apparent_temperature_max[1]}°C</span>
        </div>
        <span className="tomorrow-normal-text"></span>
      </WeatherCard>
      <WeatherCard className="small-card" title="UV-Index">
        <div className="general-uv-container">
          <span className="general-uv-text">{uvIndices[formatTemperatureRounded(weatherData?.daily?.uv_index_max[1] || 0)]}</span>
          <div
            className="uv-slider"
            style={{ "--uv-index": formatTemperatureRounded(weatherData?.daily?.uv_index_max[1] || 0)}}
          >
            <div className="uv-handle">
              {(weatherData?.daily?.uv_index_max[1] || weatherData?.daily?.uv_index_max[1] === 0) ? formatTemperatureRounded(weatherData?.daily?.uv_index_max[1] || 0) : "?"}
            </div>
          </div>
        </div>
      </WeatherCard>
      <WeatherCard className="small-card" title="Wind">
        <div className="general-wind-container">
          <span className="tomorrow-normal-text"><span className="mean-symbol">&#8960;</span>{formatDecimal(weatherData?.daily?.wind_speed_10m_mean[1] || "?")}km/h</span>
          <span className="tomorrow-normal-text">Max: {formatDecimal(weatherData?.daily?.wind_speed_10m_max[1] || "?")}km/h</span>
        </div>
      </WeatherCard>
      <WeatherCard className="small-card" title="Niederschlag">
        <span className="tomorrow-normal-text">Summe: {(weatherData?.daily?.precipitation_sum[1] || weatherData?.daily?.precipitation_sum[1] === 0) ? weatherData?.daily?.precipitation_sum[1] : "?"}mm </span>        
        <span className="tomorrow-normal-text">Chance: {weatherData?.daily?.precipitation_probability_max[1] || "?"}%</span>
        <span className="tomorrow-normal-text">Stunden: {(weatherData?.daily?.precipitation_hours[1] || weatherData?.daily?.precipitation_hours[1] === 0) ? weatherData?.daily?.precipitation_hours[1] : "?"}h</span>
      </WeatherCard>
      <WeatherCard className="small-card" title="Luftfeuchtigkeit">
        <span className="tomorrow-normal-text">
          <span className="mean-symbol">&#8960;</span>{weatherData?.daily?.relative_humidity_2m_mean[1] || 0}% 
        </span>
      </WeatherCard>
      <WeatherCard className="small-card" title="Wolken">
          <span className="tomorrow-normal-text">
            <span className="mean-symbol">&#8960;</span>{weatherData?.daily?.cloud_cover_mean[1] || 0}% bedeckt
          </span>
      </WeatherCard>
      <WeatherCard className="small-card" title="Sonne">
          <div className="general-sun-container">
            <div
              className="general-sun-slider"
              style={{ "--time": 43200}}
            >
              <div className="general-sun-handle"></div>
            </div>
            <div className="general-sun-text-container">
              <span className="general-sun-text">{(weatherData?.daily?.sunrise[1] || 0).toString().slice(-5)}</span>
              <span className="general-sun-text">{(weatherData?.daily?.sunset[1] || 0).toString().slice(-5)}</span>
            </div>
          </div>
          <span className="general-sun-duration-text">Sonnenstunden: {((weatherData?.daily?.sunshine_duration[1] || 0) / 3600).toFixed(0).toString()}</span>
      </WeatherCard>
    </div>
  );
}

export default TomorrowWeather;