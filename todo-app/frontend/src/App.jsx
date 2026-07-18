import './App.css';
import TodoEntry from './TodoEntry.jsx';
import ConfirmDeleteDialog from './ConfirmDeleteDialog.jsx';
import NewEntryDialog from "./NewEntryDialog.jsx";
import EditEntryDialog from "./EditEntryDialog.jsx"
import {useState, useEffect} from "react";
import axios from 'axios';

//App
function App() {
  
  //Todo Einträge als State 
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const {data: response} = await axios.get('http://localhost:3000/api');
        setTodos(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  //Änderungen in Todo Einträgen als Effect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos]);

  //Dialogfenster zum hinzufügen eines Todo Eintrags als State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState(null);

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

  //Todo bearbeiten
  function editTodo(todo) {
    if (!isEditDialogOpen) {
      setIsEditDialogOpen(true);
      setName(todo.name);
      setDeadline(todo.deadline);
      setTodoToEdit(todo);
    }
  }

  function confirmEditTodo() {
    let newTodos = todos.map(todo => { 
      if (todo.id === todoToEdit.id) {
        todo.deadline = deadline;
        todo.name = name;
      }

      return todo;
    });

    setTodos(newTodos);

    localStorage.setItem("todos", JSON.stringify(todos))

    setIsEditDialogOpen(false);
    setTodoToEdit(null);
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
                onEdit={editTodo}
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
        <EditEntryDialog 
          isOpen={isEditDialogOpen}
          todo={todoToEdit}
          name={name}
          deadline={deadline}
          setName={setName}
          setDeadline={setDeadline}
          onAdd={confirmEditTodo}
          onClose={() => {
            setIsEditDialogOpen(false);
            setTodoToEdit(null)
          }}
        />
        <button className="add-button" onClick={() => setIsAddDialogOpen(true)}>
          Hinzufügen
        </button>
    </div>
  );
}

export default App