import { useState } from 'react';
import './App.css';
import pinIcon from "./assets/44334.png";

function App() {

  //React States für die Auswahl der Städte
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState();
  const [cities, setCities] = useState(["Leipzig", "Berlin"]);
  const [weatherData, setWeatherData] = useState();

  //Aktuell geöffnete Seite
  const TABS = [
    { id: "general", label: "Allgemein" },
    { id: "now", label: "Jetzt" },
    { id: "hourly", label: "Stündlich" },
    { id: "daily", label: "Täglich" },
  ];
  const [currentTab, setCurrentTab] = useState("general");

  //Stadt aus dem Dropdown auswählen
  function handleCityChange(city) {
    setCurrentCity(city);
    setDropdownOpen(false);

    //API-Aufruf
    setWeatherData();
  }

  return (
    <div className="app-container">
      <section className="location-selector-container">
        <img className="pin-icon" src={pinIcon}></img>
        <div className="location-selector-dropdown">
          <button className="location-selector-dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {currentCity}
          </button>
          {dropdownOpen && (
            <div className="location-selector-dropdown-menu">
              {cities.map((city) => (
                <div
                  key={city}
                  className="location-selector-dropdown-option"
                  onClick={() => {
                    handleCityChange(city);
                  }}>
                  {city}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="add-location-button">+</button>
      </section>
      <main className="main">
          <section className="overview-container">
            <div className="overview-temperature-container">
              <div className="overview-current-temperature-container">
                <h1 className="current-temperature">31°C</h1>
                <span className="current-weather">Sonnig</span>
              </div>
              <div className="overview-extreme-temperatures-container">
                 <span className="extreme-temperatures">&#8593; 31°C</span>
                 <span className="extreme-temperatures">&#8595; 12°C</span>
              </div>
            </div>
            <img className="overview-icon" src="https://cdn-icons-png.flaticon.com/128/1163/1163661.png"></img>
          </section>
          <nav className="details-type-selector">
            {
              TABS.map(tab => (
                <button key={tab.id} onClick={() => setCurrentTab(tab.id)} className={tab.id === currentTab ? "details-type-button-active" : "details-type-button"}>
                  {tab.label}
                </button>
              ))
            }
          </nav>
          <section className="details-container">
            {currentTab.id === "general" && <GeneralWeather />}
            {currentTab.id === "now" && <NowWeather />}
            {currentTab.id === "hourly" && <HourlyWeather />}
            {currentTab.id === "daily" && <DailyWeather />}
          </section>
      </main>
    </div>
  )
}

export default App
