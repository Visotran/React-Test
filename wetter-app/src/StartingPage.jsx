import { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink } from 'react-router';
import './StartingPage.css';
import pinIcon from "./assets/44334.png";
import pen from "./assets/pen.png"
import GeneralWeather from "./WeatherLayouts/GeneralWeather";
import NowWeather from "./WeatherLayouts/NowWeather";
import HourlyWeather from "./WeatherLayouts/HourlyWeather";
import DailyWeather from "./WeatherLayouts/DailyWeather";
import { formatTemperature, formatWeatherCodeImg, formatWeatherCodeText } from './utils/formating';

function StartingPage({cities, weatherData, setWeatherData, currentCity, setCurrentCity}) {

  //React States für die Auswahl der Städte
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //React Refs
  const dropdownRef = useRef(null);
  const ignoreRef = useRef(null);

  //Aktuell geöffnete Seite
  const TABS = [
    { id: "general", label: "Allgemein" },
    { id: "now", label: "Jetzt" },
    { id: "tomorrow", label: "Morgen" },
    { id: "hourly", label: "Stündlich" },
    { id: "daily", label: "Täglich" },
  ];
  const [currentTab, setCurrentTab] = useState({id: "general", label: "Allgemein"});

  //Stadt aus dem Dropdown auswählen
  function handleCityChange(city) {
    setCurrentCity(city);
    setDropdownOpen(false);
  }

  //Bei Linksklick das Dropdown schließen
  useEffect(() => {
    function handleClickOutside(event) {
      // Nur Linksklick
      if (event.button !== 0) return;

      // Klick außerhalb?
      if (dropdownRef.current?.contains(event.target) || ignoreRef.current?.contains(event.target)) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Wetter API Aufruf
  useEffect(() => {
    if (currentCity.name !== "Keine Orte") {
      async function fetchWeather() {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${currentCity.lat}&longitude=${currentCity.lng}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,apparent_temperature_max,apparent_temperature_min,cloud_cover_mean,wind_speed_10m_mean,precipitation_sum,precipitation_probability_max,uv_index_max,sunshine_duration,precipitation_hours,wind_speed_10m_max&hourly=weather_code,temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,cloud_cover,precipitation,precipitation_probability,uv_index,is_day&current=uv_index,weather_code,apparent_temperature,is_day,precipitation,cloud_cover,wind_speed_10m,wind_direction_10m,temperature_2m,relative_humidity_2m,pressure_msl&timezone=Europe%2FBerlin&forecast_days=16&forecast_hours=24`
          );

          const data = await response.json();
          console.log(data + " " + currentCity.name)
          setWeatherData(data || []);
        } catch (error) {
          console.error(error);
        }
      }

      fetchWeather();

      //Wetter Daten alle 5 Minuten aktualisieren
      const interval = setInterval(() => {
        fetchWeather();
      }, 5 * 60 * 1000); 

      // cleanup
      return () => clearInterval(interval);

    } else {
      setWeatherData("");
    }
  }, [currentCity]);

  //Icon Pfad speichern
  const icon = useMemo(() => {
    return formatWeatherCodeImg(
      weatherData?.current?.weather_code,
      weatherData?.current?.is_day
    );
  }, [weatherData]);

  return (
    <div className="app-container">
      <section className="location-selector-container">
        <div className="location-selector-dropdown">
          <button className="location-selector-dropdown-button" ref={ignoreRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
            <img className="pin-icon" src={pinIcon}></img><span className="current-location-text">{currentCity.name}</span>
          </button>
          {dropdownOpen && (
            <div ref={dropdownRef} className="location-selector-dropdown-menu">
              {cities.map((city) => (
                <div
                  key={city.id}
                  className="location-selector-dropdown-option"
                  onClick={() => {
                    handleCityChange(city);
                  }}>
                  {city.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <NavLink to="/edit">
          <button className="add-location-button">
            <img src={pen} className="add-location-icon"/>
          </button>
        </NavLink>
      </section>
      <main className="main">
          <section className="overview-container">
            <div className="overview-temperature-container">
              <div className="overview-current-temperature-container">
                <h1 className="current-temperature">{formatTemperature(weatherData?.current?.temperature_2m || "?")}°C</h1>
                <span className="current-weather">{formatWeatherCodeText(weatherData?.current?.weather_code)}</span>
              </div>
              <div className="overview-extreme-temperatures-container">
                 <span className="extreme-temperatures">&#8593; {formatTemperature(weatherData?.daily?.temperature_2m_max[0] || "?")}°C</span>
                 <span className="extreme-temperatures">&#8595; {formatTemperature(weatherData?.daily?.temperature_2m_min[0] || "?")}°C</span>
              </div>
            </div>
            <img className="overview-icon" src={icon}></img>
          </section>
          <nav className="details-type-selector">
            {
              TABS.map(tab => (
                <button key={tab.id} onClick={() => setCurrentTab(tab)} className={tab.id === currentTab.id ? "details-type-button-active" : "details-type-button"}>
                  {tab.label}
                </button>
              ))
            }
          </nav>
          <section className="details-container">
            {currentTab.id === "general" && <GeneralWeather weatherData={weatherData} />}
            {currentTab.id === "now" && <NowWeather weatherData={weatherData} />}
            {currentTab.id === "hourly" && <HourlyWeather weatherData={weatherData} />}
            {currentTab.id === "daily" && <DailyWeather weatherData={weatherData} />}
          </section>
      </main>
    </div>
  )
}

export default StartingPage
