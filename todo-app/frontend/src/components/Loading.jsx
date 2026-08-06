import './Loading.css';

export function GeneralLoading({loadingMessage}) {
  if (loadingMessage) return (
    <div className="loading-container">
      <div className="loading-icon"></div>
      <p className="loading-message">{loadingMessage}</p>
    </div>
  )
}