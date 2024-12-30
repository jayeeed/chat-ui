import React, { useState } from 'react';
import axios from 'axios';

const ChatInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user's message to chat
    addMessage({ sender: 'user', text: message });

    try {
      // Send message to API
      const response_raw = await axios.post(
        `http://127.0.0.1:8000/handle-expense/`,
        {},
        {
          params: { user_input: message },
          headers: { Accept: 'application/json' },
        }
      );
      console.log('Response:', response_raw.data)
      
      const response = response_raw.data;

      // Add API response to chat
      addMessage({
        sender: 'api',
        text: `Intent: ${response.intent}*********************************** Date: ${response.date}, Amount: ${response.amount}, Category: ${response.category}, Description: ${response.description}`,
      });
    } catch (error) {
      console.error('Error:', error);
      addMessage({ sender: 'api', text: 'Error: Could not process your request.' });
    }

    setMessage('');
  };

  return (
    <form onSubmit={handleSend} className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
