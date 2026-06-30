import WeatherCard from "../WeatherCard";
import "./DailyWeather.css";
import {formatTemperatureRounded, formatDecimal, formatWeatherCodeImg, formatDate} from "../utils/formating";
import termomether from "../assets/termomether.png";
import raindrop from "../assets/raindrop.png";
import wind from "../assets/wind.png";
import uvIndex from "../assets/uv-index.png";

function DailyWeather({weatherData}) {

  const days = weatherData?.daily?.time || [];

  return (
    <WeatherCard className="small-card" title="16-Tage-Vorhersage">
      {
        days.map((element, index) => (
          <div key={element} className="daily-element-container">
            <span className="daily-normal-text bold">{formatDate(element.slice(-5))}</span>
            <img className="daily-weathercode-icon" src={formatWeatherCodeImg(
              weatherData?.daily?.weather_code[index], 1
            )}></img>

            <div className="daily-element-group">
              <img className="daily-element-icon" src={termomether}></img>
              <span className="daily-normal-text">{formatDecimal(weatherData?.daily?.temperature_2m_min[index])}°C</span>
              <span className="daily-normal-text">{formatDecimal(weatherData?.daily?.temperature_2m_max[index])}°C</span>
            </div>
            <div className="daily-element-group">
              <img className="daily-element-icon" src={raindrop}></img>
              <span className="daily-normal-text">{formatDecimal(weatherData?.daily?.precipitation_probability_max[index])}%</span>
            </div>
            <div className="daily-element-group">
              <img className="daily-element-icon" src={wind}></img>
              <span className="daily-normal-text">{formatTemperatureRounded(weatherData?.daily?.wind_speed_10m_mean[index])}km/h</span>
            </div>
            <div className="daily-element-group">
              <img className="daily-element-icon" src={uvIndex}></img>
              <span className="daily-normal-text">UV {formatTemperatureRounded(weatherData?.daily?.uv_index_max[index])}</span>
            </div>
          </div>
        ))
      }
    </WeatherCard>
  );
}

export default DailyWeather;