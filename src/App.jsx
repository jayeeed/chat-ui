import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatDisplay from './components/ChatDisplay';
import ImageUpload from './components/ImageUpload';

const App = () => {
  const [conversations, setConversations] = useState([]);

  const addMessage = (message) => {
    setConversations((prev) => [...prev, message]);
  };

  return (
    <div className="chat-container">
      {/* <h1>LLM Chat</h1> */}
      <ChatDisplay conversations={conversations} />
      <ChatInput addMessage={addMessage} />
      {/* <ImageUpload /> */}
    </div>
  );
};

export default App;
