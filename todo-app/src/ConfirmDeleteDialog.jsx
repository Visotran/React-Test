import "./ConfirmDeleteDialog.css"

function ConfirmDeleteDialog({todo, onConfirmDelete, onCancelDelete}) {
  if (!todo) {
    return null;
  }

  return (
    <div className="confirm-dialog-container">
        <p>
          Willst du den Eintrag "{todo.name}" wirklich löschen?
        </p>
        {console.log("Todo: " + todo)}

        <button onClick={onConfirmDelete}>
          Ja
        </button>

        <button onClick={onCancelDelete}>
          Nein
        </button>
    </div>
  );
}

export default ConfirmDeleteDialog;