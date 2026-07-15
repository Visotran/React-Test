import "./NewEntryDialog.css";
import { useEffect } from "react"

function NewEntryDialog({isOpen, name, deadline, setName, setDeadline, onAdd, onClose}) {
    
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
        <h2>Neuen Todo-Eintrag hinzufügen</h2>
          
        <p className="confirm-dialog-label">
          Welche Aufgabe willst du erledigen:
        </p>

        <input
          className="confirm-dialog-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Todo Name"
        />

        <p className="confirm-dialog-label">
          Bis wann soll die Aufgabe erledigt sein:
        </p>

        <input
          className="confirm-dialog-input"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="dialog-buttons-container">
          <button className="confirm-add-button" onClick={onAdd}>
            Hinzufügen
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