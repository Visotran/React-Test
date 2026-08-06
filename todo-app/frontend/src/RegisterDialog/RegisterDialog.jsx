import { useState} from "react";
import StatusMessage from './StatusMessage.jsx';
import axios from 'axios';
import "../LoginDialog/LoginDialog.jsx";
import {Link} from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";

function LoginDialog() {

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  //Login
  const login = async () => {

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/api/register', {username: username, password: password});
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.error('Fehler:', error?.response?.data?.error ?? error);
      setErrorMessage(error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Registrieren</h1>

      <input
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />

      <input
        className="login-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button className="login-button" onClick={login}>
        Registrieren
      </button>
      <Link to="/login" className="login-nav-link">Anmelden</Link>

      <StatusMessage error={errorMessage} loading={loading}></StatusMessage>
    </div>
  );
}

export default LoginDialog;