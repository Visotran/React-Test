import "./NewEntryDialog.css";

function NewEntryDialog({isOpen, name, deadline, setName, setDeadline, onAdd, onClose}) {
  if (!isOpen) return null;  
  
  return (
    <div className="confirm-dialog-container">
      <h2>Neuen Todo-Eintrag hinzufügen</h2>
      
      <p>
        Welche Aufgabe willst du erledigen:
      </p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Todo Name"
      />

      <p>
        Bis wann soll die Aufgabe erledigt sein:
      </p>

      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button onClick={onAdd}>
        Hinzufügen
      </button>

      <button onClick={onClose}>
        Abbrechen
      </button>
    </div>
  );
}

export default NewEntryDialog;