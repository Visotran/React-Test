import {useState} from 'react';
import './App.css';
import {ChatInput} from './components/ChatInput.jsx';
import {ChatMessage} from './components/ChatMessage.jsx';
import ChatMessages from './components/ChatMessages.jsx';

//App
function App() {
  const [chatMessages, setChatMessages] = useState([]);

  return (
    <div className="app-container">
      {chatMessages.length === 0 ? (<p className="welcome-message">Welcome to the chatbot project! Send a message using the textbox below.</p>) : ""}
      <ChatMessages 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
      <ChatInput 
        chatMessages = {chatMessages}
        setChatMessages = {setChatMessages}
      />
    </div>
  );
}

export default App
