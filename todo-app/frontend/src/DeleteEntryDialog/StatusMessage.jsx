import infoIcon from '../assets/info.png';
import '../StatusMessage.css';

function StatusMessage({error, loading}) {
  function getErrorMessage(err) {
    if (err?.status == "500") {
      return "Beim Löschen des Todo-Eintrags ist leider ein Serverproblem aufgetreten. Versuche es später erneut.";
    }

    if (error?.response?.data?.error) {
      return error.response.data.error;
    }

    return "Beim Löschen des Todo-Eintrags ist leider ein Fehler aufgetreten. Stelle sicher, dass eine Internetverbindung besteht, oder versuche es später erneut.";
  }

  if (!error && !loading) return;

  if (loading) return (
    <div className="loading-container">
      <div className="loading-icon"></div>
      <p className="loading-message">Todo-Eintrag löschen...</p>
    </div>
  )

  if (error) return (
    <>
      <div className="error-container">
        <img className="error-icon" src={infoIcon}></img>
        <p className="add-entry-error-message">{getErrorMessage(error)}</p>
      </div>
    </>
  )
}

export default StatusMessage;