import "./ConfirmDeleteDialog.css";
import { useEffect } from "react";

function ConfirmDeleteDialog({todo, onConfirmDelete, onCancelDelete}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onCancelDelete();
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


       <div className="dialog-buttons-container">
          <button className="confirm-add-button" onClick={onConfirmDelete}>
            Ja
          </button>

          <button className="cancel-add-button" onClick={onCancelDelete}>
            Nein
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteDialog;