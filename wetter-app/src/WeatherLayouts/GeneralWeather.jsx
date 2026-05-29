import "./GeneralWeather.css";
import WeatherCard from "../WeatherCard";

function GeneralWeather({weatherData}) {
 
  return (
    <>
      <div className="top-part">
        <WeatherCard>
          
        </WeatherCard>
        <WeatherCard>

        </WeatherCard>
      </div>
      <div className="bottom-part">
        <WeatherCard>

        </WeatherCard>
        <WeatherCard>

        </WeatherCard>
        <WeatherCard>

        </WeatherCard>
        <WeatherCard>

        </WeatherCard>
        <WeatherCard>

        </WeatherCard>
      </div>
    </>
  )
}

export default GeneralWeather;