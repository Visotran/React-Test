import "./EditLocationsPage.css";
import { NavLink } from 'react-router';
import {useState, useEffect} from 'react';

function AddLocationPage({cities, setCities, currentCity, setCurrentCity}) {
 
  let [locationQuery, setLocationQuery] = useState();
  let [currentLocationQuery, setCurrentLocationQuery] = useState("");
  let [results, setResults] = useState([]);  

  //Funktion zum Auswählen eines Orts aus den Vorschlägen
  function handleLocationSelect(result) {
    const city = {
      id: crypto.randomUUID(),
      name: result.name,
      state: result.admin1,
      country: result.country,
      lat: result.latitude,
      lng: result.longitude
    };
    console.log(city);
    if (currentCity.id === 0) {
      setCurrentCity(city);
    }
    setCities([...cities, city]);
    setLocationQuery("");
    setCurrentLocationQuery("");
    setResults([]);
  }

  //Geocoding API Aufruf
  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${locationQuery}&count=10&language=de&format=json`
        );

        const data = await response.json();

        setResults(data.results || []);

      } catch (error) {
        console.error(error);
      }
    }

    fetchLocations();
  }, [locationQuery]);

//Funktion zum Löschen eines Orts
function handleLocationDeletion(id) {
  const newCities = [];
  cities.map((city) => {
    if (city.id !== id) {
      newCities.push(city);
    }
  })
  setCities(newCities);

  if (currentCity?.id === id) {
    setCurrentCity(
      newCities[0] || {
        id: 0,
        name: "Keine Orte",
        state: "",
        country: "",
        lat: 0,
        lng: 0
      }
    );
  }
}

  return (
    <div className="edit-locations-page">
      <main className="edit-locations-container">
        <h1>Orte bearbeiten</h1>
        <div className="edit-locations-main">
          <div className="edit-locations-left">
            <h2>Bestehende Orte ({cities.length})</h2>
            {
              cities.map((city) => (
                (<div key={city.id} className="city-row"> 
                  <button className="delete-location-button" onClick={() => handleLocationDeletion(city.id)}>
                    x <span className="tooltiptext">Löschen</span>
                  </button>
                  <span className="city-row-text">{city.name},</span>
                  <span className="city-row-text-small">{city.state},</span>
                  <span className="city-row-text-small">{city.country}</span>
                </div>)
              ))
            }
          </div>
          <div className="edit-locations-right">
            <h2>Neuen Ort hinzufügen</h2>
            <div className="edit-locations-right-input">
              <input 
                type="text" 
                value={currentLocationQuery}   
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLocationQuery(currentLocationQuery);
                  }
                }} 
                onChange={(e) => setCurrentLocationQuery(e.target.value)} 
                className="edit-locations-right-inputfield" placeholder="Ortsname"
              />
              <button className="back-button" onClick={() => setLocationQuery(currentLocationQuery)}>
                Suchen
              </button>
            </div>
            <h2 className="edit-location-right-suggestions-title">Passenden Ort auswählen:</h2>
            <div className="edit-locations-right-suggestions">
            {
              (results || []).map((result) => (
                (
                  <button key={result.id} className="location-suggestion-button" onClick={() => handleLocationSelect(result)}>
                    <span className="suggested-city-row-text">{result.name}, </span>
                    <span className="suggested-city-row-text-small">{result.admin1}, </span>
                    <span className="suggested-city-row-text-small">{result.country}</span>
                  </button>
                )
              ))
            }
            </div>
          </div>
        </div>
        <div className="back-button-container">
          <NavLink to="/">
            <button className="back-button">
              Zurück
            </button>
          </NavLink>
        </div>
      </main>
    </div>
  );
}

export default AddLocationPage;