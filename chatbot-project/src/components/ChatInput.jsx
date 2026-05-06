import { useState} from 'react';
import {Chatbot} from 'supersimpledev';
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatInput.css";

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState('');
  
  function saveInputText(event) {
      setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === '') return;
    
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];

    setChatMessages(newChatMessages);
    setInputText('');

    //Ladeanzeige
    setIsLoading(true);

    setChatMessages([
      ...newChatMessages,
      {
        message: <img className="loading-image" src="https://supersimple.dev/images/loading-spinner.gif" />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    //Chatbot-Antwort
    const response = await Chatbot.getResponseAsync(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Prompt eingeben..."
        size="30" 
        onChange={saveInputText} 
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button 
        onClick={sendMessage}
        className="send-button">
        Send
      </button>
    </div>
  );
}