import { useState, useEffect } from "react";
import StatusMessage from './StatusMessage.jsx';
import axios from 'axios';
import "./NewEntryDialog.css";

function NewEntryDialog({isOpen, name, deadline, setName, setDeadline, setIsAddDialogOpen, fetchDataFunc}) {
  
  //Todo Eintrag hinzufügen
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const addTodo = async () => {

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/api', {name: name, deadline: deadline});
      console.log('Antwort:', response.data);
      fetchDataFunc();
      setName("");
      setDeadline("");

      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Fehler:', error?.response?.data?.error ?? error);
      setErrorMessage(error);
    }
    finally {
      setLoading(false);
    }
  };

  function onClose() {
    setErrorMessage(null);
    setLoading(false);
    setIsAddDialogOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
  
  if (!isOpen) return null;  
  
  return (
    <div className="add-overlay-container" >
      <div className="add-confirm-dialog-container">
        <h2>Neuen Todo-Eintrag hinzufügen</h2>
          
        <p className="add-confirm-dialog-label">
          Welche Aufgabe willst du erledigen:
        </p>

        <input
          className="add-confirm-dialog-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo Name"
        />

        <p className="add-confirm-dialog-label">
          Bis wann soll die Aufgabe erledigt sein:
        </p>

        <input
          className="add-confirm-dialog-input"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <StatusMessage error={errorMessage} loading={loading}></StatusMessage>
        <div className="add-dialog-buttons-container">
          <button className="add-confirm-add-button" onClick={addTodo}>
            Hinzufügen
          </button>

          <button className="add-cancel-add-button" onClick={onClose}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEntryDialog;