import { useState } from "react";
import StatusMessage from './StatusMessage.jsx';
import axios from 'axios';
import "./LoginDialog.css";
import { Link } from 'react-router-dom';

function LoginDialog() {

  // States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //Login
  const login = async () => {

    setLoading(true);
    setErrorMessage(null);

    try {
      await axios.post('http://localhost:3000/api/login', {username: username, password: password});
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
      <h1>Anmelden</h1>

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
        Anmelden
      </button>
      <Link to="/register" className="login-nav-link">Account erstellen</Link>

      <StatusMessage error={errorMessage} loading={loading}></StatusMessage>
    </div>
  );
}

export default LoginDialog;