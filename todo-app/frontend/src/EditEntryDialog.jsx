import "./NewEntryDialog.css";
import { useEffect } from "react"

function NewEntryDialog({isOpen, name, deadline, todo, setName, setDeadline, onAdd, onClose}) {
    
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
    <div className="overlay-container" >
      <div className="confirm-dialog-container">
        <h2>Todo-Eintrag bearbeiten</h2>
          
        <p className="confirm-dialog-label">
          Namen des Eintrags bearbeiten:
        </p>

        <input
          className="confirm-dialog-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo Name"
        />

        <p className="confirm-dialog-label">
          Deadline des Eintrags bearbeiten:
        </p>

        <input
          className="confirm-dialog-input"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="dialog-buttons-container">
          <button className="confirm-add-button" onClick={onAdd}>
            Bestätigen
          </button>

          <button className="cancel-add-button" onClick={onClose}>
            Abbrechen
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEntryDialog;