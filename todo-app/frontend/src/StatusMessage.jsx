import infoIcon from './assets/info.png';
import loadingIcon from './assets/loading-spinner.gif';
import './StatusMessage.css';

function StatusMessage({error, loading, reloadFunc}) {
  function getErrorMessage(err) {
    if (err?.status == "500") {
      return "Beim Laden der To-Do-Einträge ist leider ein Serverproblem aufgetreten. Versuche es später erneut.";
    }

    return "Beim Laden der To-Do-Einträge ist leider ein Fehler aufgetreten. Stelle sicher, dass eine Internetverbindung besteht, oder versuche es später erneut.";
  }

  if (!error && !loading) return;

  if (loading) return (
    <div className="loading-container">
      <div className="loading-icon"></div>
      <p className="loading-message">Laden der To-Do-Liste...</p>
    </div>
  )

  if (error) return (
    <>
      <div className="error-container">
        <img className="error-icon" src={infoIcon}></img>
        <p className="error-message">{getErrorMessage(error)}</p>
      </div>
      <button className="error-button" onClick={reloadFunc}>Erneut versuchen</button>
    </>
  )
}

export default StatusMessage;