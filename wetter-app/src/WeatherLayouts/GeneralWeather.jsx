import "./GeneralWeather.css";
import WeatherCard from "../WeatherCard";
import { formatTemperatureRounded, formatDate, degreesToDirection, formatWeatherCodeImg, formatDecimal, secondsSinceMidnight } from "../utils/formating";
import uvIndices from "../data/uv";
import compassIcon from "../assets/compass.png";

function GeneralWeather({ weatherData }) {

  return (
    <>
      <div className="top-part">
        <WeatherCard className="big-card" title="24h Vorhersage">
          <div className="general-hourly-container">
            {weatherData?.hourly?.time.map((hour, i) => (
              <div key={hour} className="general-hourly-element">
                <img className="general-hourly-element-icon" src={formatWeatherCodeImg(
                  weatherData?.hourly?.weather_code[i],
                  weatherData?.hourly?.is_day[i]
                )}></img>
                <div className="general-hourly-element-text">{formatTemperatureRounded(weatherData?.hourly?.temperature_2m[i] || 0)}°C</div>
                <div className="general-hourly-element-text">{weatherData?.hourly?.precipitation_probability[i] || 0}%</div>
                <div className="general-hourly-element-time">{hour.slice(-5)}</div>
              </div>
            ))}
          </div>
        </WeatherCard>
        <WeatherCard className="big-card" title="5-Tage-Vorhersage">
          <div className="general-daily-container">
            {weatherData?.daily?.time.slice(0, 5).map((day, i) => (
              <div key={day} className="general-daily-element">
                <img className="general-daily-element-icon" src={formatWeatherCodeImg(
                  weatherData?.daily?.weather_code[i], 1
                )}></img>
                <div className="general-daily-element-text">{formatTemperatureRounded(weatherData?.daily?.temperature_2m_min[i] || 0)}°C</div>
                <div className="general-daily-element-text">{formatTemperatureRounded(weatherData?.daily?.temperature_2m_max[i] || 0)}°C</div>
                <div className="general-daily-element-text">{weatherData?.daily?.precipitation_probability_max[i] || 0}%</div>
                <div className="general-daily-element-time">{formatDate(day.slice(-5))}</div>
              </div>
            ))}
          </div>
        </WeatherCard>
      </div>
      <div className="middle-part">
        <WeatherCard className="small-card" title="Gefühlt">
          <span className="general-apparent-text">{formatTemperatureRounded(weatherData?.current?.apparent_temperature || 0)}°C</span>
        </WeatherCard>
        <WeatherCard className="small-card" title="UV-Index">
          <div className="general-uv-container">
            <span className="general-uv-text">{uvIndices[formatTemperatureRounded(weatherData?.current?.uv_index || 0)]}</span>
            <div
              className="uv-slider"
              style={{ "--uv-index": formatTemperatureRounded(weatherData?.current?.uv_index || 0) }}
            >
              <div className="uv-handle">
                {(weatherData?.current?.uv_index || weatherData?.current?.uv_index === 0) ? formatTemperatureRounded(weatherData?.current?.uv_index || 0) : "?"}
              </div>
            </div>
          </div>
        </WeatherCard>
        <WeatherCard className="small-card" title="Wind">
          <div className="general-wind-container">
            <span className="general-wind-text">{formatDecimal(weatherData?.current?.wind_speed_10m || "?")}km/h</span>
            <div className="general-wind-direction-container">
              <img className="general-wind-direction-icon" src={compassIcon}></img>
              <span className="general-wind-text">{degreesToDirection(weatherData?.current?.wind_direction_10m || 0)}</span>
            </div>
          </div>
        </WeatherCard>
        <WeatherCard className="small-card" title="Wolken">
          <span className="general-cloud-text">
            {weatherData?.current?.cloud_cover}% bedeckt
          </span>
        </WeatherCard>
        <WeatherCard className="small-card" title="Sonne">
          <div className="general-sun-container">
            <div
              className="general-sun-slider"
              style={{ "--time": secondsSinceMidnight(weatherData?.current?.time || 0) }}
            >
              <div className="general-sun-handle"></div>
            </div>
            <div className="general-sun-text-container">
              <span className="general-sun-text">{(weatherData?.daily?.sunrise[0] || 0).toString().slice(-5)}</span>
              <span className="general-sun-text">{(weatherData?.daily?.sunset[0] || 0).toString().slice(-5)}</span>
            </div>
          </div>
          <span className="general-sun-duration-text">Sonnenstunden: {((weatherData?.daily?.sunshine_duration[0] || 0) / 3600).toFixed(0).toString()}</span>
        </WeatherCard>
      </div>
      <div className="bottom-part">
        <WeatherCard className="small-card" title="Niederschlag">
          <span className="general-uv-text">
            Menge: {(weatherData?.current?.precipitation || weatherData?.current?.precipitation === 0) ? weatherData?.current?.precipitation : "?"}mm
          </span>
          <span className="general-uv-text">
            Chance: {(weatherData?.hourly?.precipitation_probability[0] || weatherData?.hourly?.precipitation_probability[0] === 0) ? weatherData?.hourly?.precipitation_probability[0] : "?"}%
          </span>
        </WeatherCard>
        <WeatherCard className="small-card" title="Luftfeuchtigkeit">
          <span className="general-uv-text">
            {weatherData?.current?.relative_humidity_2m}%
          </span>
        </WeatherCard>
        <WeatherCard className="small-card" title="Luftdruck">
          <span className="general-uv-text">
            {formatDecimal(weatherData?.current?.pressure_msl || "?")}hPa
          </span>
        </WeatherCard>
        <WeatherCard className="small-card" title="Sichtweite">
          <span className="general-uv-text">
            {formatDecimal((weatherData?.current?.visibility || 0) / 1000)}km
          </span>
        </WeatherCard>
      </div>
    </>
  )
}

export default GeneralWeather;