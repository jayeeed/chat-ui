import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatDisplay from './components/ChatDisplay';

const App = () => {
  const [conversations, setConversations] = useState([]);

  const addMessage = (message) => {
    setConversations((prev) => [...prev, message]);
  };

  return (
    <div className="chat-container">
      <h1>P2P Chat</h1>
      <ChatDisplay conversations={conversations} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
};

export default App;
