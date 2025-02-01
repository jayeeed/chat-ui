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
      <ChatDisplay conversations={conversations} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
};

export default App;
