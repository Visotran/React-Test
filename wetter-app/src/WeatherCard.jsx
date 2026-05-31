import "./WeatherCard.css"

function WeatherCard({ title, children }) {
  return (
    <div className="weather-card">
      <h2 className="card-header">{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default WeatherCard;