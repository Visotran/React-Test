import "./TodoEntry.css";

function TodoEntry({todo, onDelete}) {
  return ( 
    <div className="todo-entry-container">
      <p className="todo-entry-name">{todo.name}</p>
      <p className="todo-entry-deadline">{new Date(todo.deadline).toLocaleString()}</p>
      <button className="delete-button" onClick={() => onDelete(todo)}>
        X
      </button>
    </div>
  );
}

export default TodoEntry;