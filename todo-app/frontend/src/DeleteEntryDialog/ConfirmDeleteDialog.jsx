import "./ConfirmDeleteDialog.css";
import { useState, useEffect } from "react";
import axios from "axios";
import StatusMessage from './StatusMessage.jsx';

function ConfirmDeleteDialog({todo, setTodoToDelete, fetchDataFunc}) {
  
  //Todo Eintrag löschen
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const deleteTodo = async () => {

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.delete(`http://localhost:3000/api/${todo.id}`);
      console.log('Antwort:', response.data);
      fetchDataFunc();

      onCloseDeleteDialog();
    } catch (error) {
      console.error('Fehler:', error?.response?.data?.error ?? error);
      setErrorMessage(error);
    }
    finally {
      setLoading(false);
    }
  };

  // Dialogfenster schließen
  function onCloseDeleteDialog() {
    setTodoToDelete(null);
  }


  // Abbrechen beim Escape drücken
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseDeleteDialog()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })
  
  if (!todo) {
    return null;
  }

  return (
    <div className="overlay-container">
      <div className="delete-dialog-container">
        <h2>Löschen bestätigen</h2>
        <p className="delete-dialog-text">
          Willst du den Eintrag "{todo.name}" wirklich löschen?
        </p>
        {console.log("Todo: " + todo)}

        <StatusMessage error={errorMessage} loading={loading}></StatusMessage>
        <div className="dialog-buttons-container">
          <button className="confirm-add-button" onClick={deleteTodo}>
            Ja
          </button>

          <button className="cancel-add-button" onClick={onCloseDeleteDialog}>
            Nein
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteDialog;