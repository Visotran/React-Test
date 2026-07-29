import './App.css';
import TodoEntry from './TodoEntry.jsx';
import ConfirmDeleteDialog from './DeleteEntryDialog/ConfirmDeleteDialog.jsx';
import NewEntryDialog from "./NewEntryDialog/NewEntryDialog.jsx";
import EditEntryDialog from "./EditEntryDialog/EditEntryDialog.jsx";
import StatusMessage from './StatusMessage.jsx';
import { useState, useEffect, useCallback } from "react";
import axios from 'axios';

//App
function App() {

  //Todo Einträge als State 
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const { data } = await axios.get("http://localhost:3000/api");
      setTodos(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 0);

    return () => clearTimeout(timeout);
  }, [fetchData]);


  //Dialogfenster zum hinzufügen eines Todo Eintrags als State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  //States zum Speichern der Daten zum Hinzufügen / bearbeiten eines Todos
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");


  //Zu löschender Todo Eintrag als State
  const [todoToDelete, setTodoToDelete] = useState(null);

  //Löschen von einem Todo Eintrag anfragen
  function requestDeleteTodo(todo) {
    setTodoToDelete(todo);
  }


  //Dialogfenster zum Bearbeiten eines Todo Eintrags als State
  const [todoToEdit, setTodoToEdit] = useState(null);

  //Todo bearbeiten
  function editTodo(todo) {
    setTodoToEdit(todo);
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
      <StatusMessage error={errorMessage} loading={loading} reloadFunc={fetchData}></StatusMessage>
      <ConfirmDeleteDialog
        todo={todoToDelete}
        setTodoToDelete={setTodoToDelete}
        fetchDataFunc={fetchData}
      />
      <NewEntryDialog
        isOpen={isAddDialogOpen}
        name={name}
        deadline={deadline}
        setName={setName}
        setDeadline={setDeadline}
        setIsAddDialogOpen={setIsAddDialogOpen}
        fetchDataFunc={fetchData}
      />
      <EditEntryDialog
        todoToEdit={todoToEdit}
        setTodoToEdit={setTodoToEdit}
        fetchDataFunc={fetchData}
      />
      <button className="add-button" onClick={() => setIsAddDialogOpen(true)}>
        Hinzufügen
      </button>
    </div>
  );
}

export default App