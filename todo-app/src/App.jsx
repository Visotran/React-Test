import './App.css';
import TodoEntry from './TodoEntry.jsx';
import todosJSON from "./data/todos.json"
import ConfirmDeleteDialog from './ConfirmDeleteDialog.jsx';
import NewEntryDialog from "./NewEntryDialog.jsx";
import {useState, useEffect} from "react";

//App
function App() {
  
  //Todo Einträge als State 
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos")
    return (stored && stored !== "[]") ? JSON.parse(stored) : todosJSON
  });
  console.log(todos);

  //Änderungen in Todo Einträgen als Effect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  //Dialogfenster zum hinzufügen eines Todo Eintrags als State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");

  //Zu löschender Todo Eintrag als State
  const [todoToDelete, setTodoToDelete] = useState(null);


  //Todo Eintrag hinzufügen
  function addTodo() {
    if (!name.trim() || !deadline) return

    const newTodo = {
      id: Date.now(),
      name,
      deadline
    };

    setTodos(prev => [...prev, newTodo]);

    setName("");
    setDeadline("");

    setIsAddDialogOpen(false);
  }


  //Löschen von einem Todo Eintrag anfragen
  function requestDeleteTodo(todo) {
    setTodoToDelete(todo);
  }

  //Löschen von einem Todo Eintrag bestätigen
  function confirmDeleteTodo() {
    setTodos(prev => 
      prev.filter(todo => todo.id !== todoToDelete.id)
    );

    localStorage.setItem("todos", JSON.stringify(todos))

    setTodoToDelete(null);
  }

  //Löschen von einem Todo Eintrag abbrechen
  function cancelDeleteTodo() {
    setTodoToDelete(null)
  }


  //Ausgabe
  return (
    <div className="app-container">
        <h1 className="title">To-Do-Liste</h1>
        <div className="todo-entries-container">
          {
            todos.map(todo => (
              <TodoEntry
                key={todo.id}
                todo={todo}
                onDelete={requestDeleteTodo}
              />
            ))
          }
        </div>
        <ConfirmDeleteDialog
          todo={todoToDelete}
          onConfirmDelete={confirmDeleteTodo}
          onCancelDelete={cancelDeleteTodo}
        />
        <NewEntryDialog 
          isOpen={isAddDialogOpen}
          name={name}
          deadline={deadline}
          setName={setName}
          setDeadline={setDeadline}
          onAdd={addTodo}
          onClose={() => setIsAddDialogOpen(false)}
        />
        <button className="add-button" onClick={() => setIsAddDialogOpen(true)}>
          Hinzufügen
        </button>
    </div>
  );
}

export default App