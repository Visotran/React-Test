import "./TodoEntry.css";
import penIcon from "./assets/pen.png"

function TodoEntry({todo, onDelete, onEdit}) {
  return ( 
    <div className="todo-entry-container">
      <p className="todo-entry-name">{todo.name}</p>
      <p className="todo-entry-deadline">{new Date(todo.deadline).toLocaleString()}</p>
      <button className="delete-button" onClick={() => onDelete(todo)}>
        X
      </button>
      <button className="edit-button" onClick={() => onEdit(todo)}><img className="pen-icon" src={penIcon}></img></button>
    </div>
  );
}

export default TodoEntry;