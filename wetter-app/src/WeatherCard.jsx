import "./WeatherCard.css"

function WeatherCard(props) {
  return (
    <div className="weather-card">
      {props.children}
    </div>
  )
}

export default WeatherCard;