import "./EditEntryDialog.css";
import { useState, useEffect } from "react";
import StatusMessage from './StatusMessage.jsx';
import axios from "axios";

function NewEntryDialog({ todoToEdit, setTodoToEdit, fetchDataFunc }) {

  // Alte Werte
  const oldName = todoToEdit?.name ?? undefined;
  const oldDeadline = todoToEdit?.deadline ?? undefined;

  // States für die neuen Werte
  const [newName, setNewName] = useState(todoToEdit?.name ?? undefined);
  const [newDeadline, setNewDeadline] = useState(todoToEdit?.deadline ?? undefined);
  
  useEffect(() => {
    const loadOldValues = async() => {
      setNewName(todoToEdit?.name ?? undefined);
      setNewDeadline(todoToEdit?.deadline ?? undefined);
    }
    loadOldValues();
  }, [todoToEdit])

  //Todo Eintrag bearbeiten
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  //Todo bearbeiten bestätigen
  const confirmEditTodo = async () => {
    setLoading(true);
    setErrorMessage(null);

    let changes = {};
    if (newName && newName !== oldName) {
      changes.newName = newName;
    }
    if (newDeadline && newDeadline !== oldDeadline) {
      changes.newDeadline = newDeadline
    }


    try {
      const response = await axios.patch(`http://localhost:3000/api/${todoToEdit.id}`, changes);
      console.log('Antwort:', response.data);
      fetchDataFunc();

      onCloseEditDialog();
    } catch (error) {
      console.error('Fehler:', error?.response?.data?.error ?? error);
      setErrorMessage(error);
    }
    finally {
      setLoading(false);
    }
  }

  // Dialogfenster schließen
  function onCloseEditDialog() {
    setLoading(false);
    setErrorMessage(null);
    setTodoToEdit(null);
  }

  // Dialogfenster beim Drücken von Escape schließen
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCloseEditDialog();
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  })

  if (!todoToEdit) return null;

  return (
    <div className="overlay-container" >
      <div className="confirm-dialog-container">
        <h2>Todo-Eintrag bearbeiten</h2>

        <p className="confirm-dialog-label">
          Namen des Eintrags bearbeiten:
        </p>

        <input
          className="confirm-dialog-input"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Todo Name"
        />

        <p className="confirm-dialog-label">
          Deadline des Eintrags bearbeiten:
        </p>

        <input
          className="confirm-dialog-input"
          type="datetime-local"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
        />

        <StatusMessage error={errorMessage} loading={loading}></StatusMessage>

        <div className="dialog-buttons-container">
          <button className="confirm-add-button" onClick={confirmEditTodo}>
            Bestätigen
          </button>

          <button className="cancel-add-button" onClick={onCloseEditDialog}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEntryDialog;