import "./TodoEntry.css";

function TodoEntry({todo, onDelete}) {
  return ( 
    <div className="todo-entry-container">
      <p className="todo-name">{todo.name}</p>
      <p className="todo-deadline">{new Date(todo.deadline).toLocaleString()}</p>
      <button className="todo-delete-button" onClick={() => onDelete(todo)}>
        X
      </button>
    </div>
  );
}

export default TodoEntry;