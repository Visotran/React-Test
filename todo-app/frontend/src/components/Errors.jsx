import './Errors.css';
import infoIcon from '../assets/info.png';

export function InputFieldError({ errorMessage }) {
  return (
    <p className="input-field-error-text">{errorMessage}</p>
  )
}

export function GeneralError({ errorMessage }) {
  if (!errorMessage || errorMessage.trim() === "") return (
    <div className="general-error-container">
      <p className="error-message"> </p>
    </div>
  )
  if (errorMessage) return (
    <div className="general-error-container">
      <img className="error-icon" src={infoIcon}></img>
      <p className="error-message">{errorMessage}</p>
    </div>
  )
}

