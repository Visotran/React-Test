import infoIcon from './assets/info.png';
import './StatusMessage.css';

function StatusMessage({errorMessage, loadingMessage, reloadFunc}) {

  if ((!errorMessage || Object.keys(errorMessage).length === 0) && (!loadingMessage || Object.keys(loadingMessage).length === 0)) return;

  if (Object.keys(loadingMessage).length !== 0) return (
    <div className="loading-container">
      <div className="loading-icon"></div>
      <p className="loading-message">Laden der To-Do-Liste...</p>
    </div>
  )

  if (Object.keys(errorMessage).length !== 0) return (
    <>
      <div className="error-container">
        <img className="error-icon" src={infoIcon}></img>
        <p className="error-message">{errorMessage}</p>
      </div>
      <button className="error-button" onClick={reloadFunc}>Erneut versuchen</button>
    </>
  )
}

export default StatusMessage;