import { Routes, Route} from 'react-router';
import {useState, useEffect} from 'react';
import StartingPage from './StartingPage';
import EditLocationsPage from './EditLocationsPage';
import './App.css';

function App() {

  //Alle gespeicherten Städte laden
  const [cities, setCities] = useState(() => {
    const savedCities = localStorage.getItem("cities");

    return savedCities? JSON.parse(savedCities) : [];

  })

  const [weatherData, setWeatherData] = useState();

  const [currentCity, setCurrentCity] = useState(() => {
    const savedCity = localStorage.getItem("currentCity");

    return savedCity? JSON.parse(savedCity) : {
      id:0,
      name: "Keine Orte",
      state: "",
      country: "",
      lat: 0,
      lng: 0
    };

  });

  //Funktion zum Speichern aller Orte wenn cities verändert wird
  useEffect(() => {
    localStorage.setItem(
      "cities",
      JSON.stringify(cities)
    );
  }, [cities]);

  //Funktion zum Speichern des aktuell ausgewählten Orts wenn currentCity verändert wird
  useEffect(() => {
    localStorage.setItem(
      "currentCity",
      JSON.stringify(currentCity)
    );
  }, [currentCity]);

  return (
    <Routes>
      <Route path="/" element={<StartingPage cities={cities} weatherData={weatherData} setWeatherData={setWeatherData} currentCity={currentCity} setCurrentCity={setCurrentCity}/>}></Route>
      <Route path="/edit" element={<EditLocationsPage cities={cities} setCities={setCities} currentCity={currentCity} setCurrentCity={setCurrentCity}/>}></Route>
    </Routes>
  )
}

export default App