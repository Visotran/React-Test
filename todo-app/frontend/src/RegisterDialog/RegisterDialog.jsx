import { useState } from "react";
import axios from 'axios';
import "../LoginDialog/LoginDialog.jsx";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { InputFieldError, GeneralError } from "../components/Errors.jsx";
import { GeneralLoading } from "../components/Loading.jsx";
import "../LoginDialog/LoginDialog.css";

function RegisterDialog() {

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loadingMessage, setLoadingMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState({});

  const navigate = useNavigate();

  // Registrieren
  const register = async () => {

    setLoadingMessage("Account erstellen...");
    setErrorMessage(null);

    try {
      await axios.post('http://localhost:3000/api/register', { username: username, password: password });
      setLoadingMessage(null);
      navigate("/login");
    } catch (error) {
      const rawError = error?.response?.data ?? {general: "Ein Fehler ist aufgetreten. Stelle sicher, dass eine Internetverbindung besteht, oder versuche es später erneut."};;
      console.error('Fehler: ', rawError);
      setErrorMessage(rawError);
    }
    finally {
      setLoadingMessage(null);
    }
  };

  return (
    <div className="login-container">
      <h1>Registrieren</h1>

      <div className="login-input-container">
        <input
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <InputFieldError errorMessage={errorMessage?.username || " "} />
      </div>

      <div className="login-input-container">
        <input
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <InputFieldError errorMessage={errorMessage?.password || " "} />
      </div>

      <button className="login-button" onClick={register}>
        Registrieren
      </button>

      {!loadingMessage && <GeneralError errorMessage={errorMessage?.general} />}
      {loadingMessage && <GeneralLoading loadingMessage={loadingMessage} />}

      <Link to="/login" className="login-nav-link">Anmelden</Link>
    </div>
  );
}

export default RegisterDialog;