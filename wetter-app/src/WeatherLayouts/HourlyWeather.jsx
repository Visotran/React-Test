import WeatherCard from "../WeatherCard";
import "./HourlyWeather.css";
import {formatTemperatureRounded, formatDecimal, formatWeatherCodeImg} from "../utils/formating";
import termomether from "../assets/termomether.png";
import raindrop from "../assets/raindrop.png";
import wind from "../assets/wind.png";
import uvIndex from "../assets/uv-index.png";

function HourlyWeather({weatherData}) {

  const times = weatherData?.hourly?.time || [];

  return (
    <WeatherCard className="small-card" title="24h-Vorhersage">
      {
        times.map((element, index) => (
          <div key={element} className="hourly-element-container">
            <span className="hourly-normal-text bold">{element.slice(-5)}</span>
            <img className="hourly-weathercode-icon" src={formatWeatherCodeImg(
              weatherData?.hourly?.weather_code[index],
              weatherData?.hourly?.is_day[index]
            )}></img>
          
            <div className="hourly-element-group">
              <img className="hourly-element-icon" src={termomether}></img>
              <span className="hourly-normal-text">{formatDecimal(weatherData?.hourly?.temperature_2m[index])}°C</span>
            </div>
            <div className="hourly-element-group">
              <img className="hourly-element-icon" src={raindrop}></img>
              <span className="hourly-normal-text">{formatDecimal(weatherData?.hourly?.precipitation_probability[index])}%</span>
            </div>
            <div className="hourly-element-group">
              <img className="hourly-element-icon" src={wind}></img>
              <span className="hourly-normal-text">{formatTemperatureRounded(weatherData?.hourly?.wind_speed_10m[index])}km/h</span>
            </div>
            <div className="hourly-element-group">
              <img className="hourly-element-icon" src={uvIndex}></img>
              <span className="hourly-normal-text">UV {formatTemperatureRounded(weatherData?.hourly?.uv_index[index])}</span>
            </div>
          </div>
        ))
      }
    </WeatherCard>
  )
}

export default HourlyWeather; 