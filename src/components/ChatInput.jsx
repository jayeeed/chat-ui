import React, { useState } from 'react';
import axios from 'axios';

const ChatInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file) return;

    // Check if the file is an image
    if (!message.trim() && file && !file.type.startsWith('image/')) {
      addMessage({ sender: 'api', text: 'Error: Only images can be sent without text.' });
      return;
    }

    // Add user's message to chat
    if (message.trim()) {
      addMessage({ sender: 'user', text: message });
    }

    const formData = new FormData();
    formData.append('user_input', message);
    if (file) {
      formData.append('file', file);
    }

    try {
      // Send message and file to API
      const response_raw = await axios.post(
        `https://intense-secondly-gecko.ngrok-free.app/handle-expense/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );
      console.log('Response:', response_raw.data);

      const response = response_raw.data;

      if (response.intent === 'add_expense') {
        addMessage({ sender: 'api', text: `🤑 Expense Created Successfully` });
      } else if (response.intent === 'search_expense') {
        addMessage({ sender: 'api', text: `🚨 ${response.result}` });
      } else if (response.intent === 'unknown') {
          addMessage({ sender: 'api', text: `🤖 I'm sorry, I don't understand. Please try again.` });
      }

    } catch (error) {
      console.error('Error:', error);
      addMessage({ sender: 'api', text: 'Error: Could not process your request.' });
    }

    setMessage('');
    setFile(null);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const blob = items[i].getAsFile();
        setFile(blob);
        break;
      }
    }
  };

  // Create a preview URL for the uploaded image
  const imagePreview = file ? URL.createObjectURL(file) : null;

  return (
    <form onSubmit={handleSend} className="chat-input" onPaste={handlePaste}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        required={!file}
      />

      {/* Custom styled file input */}
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            width: '12px',
            height: '12px',
          }}
        />
        <button
          type="button"
          style={{
            backgroundColor: '#872341',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'white',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          +
        </button>
      </div>

      {imagePreview && (
        <div>
          <img src={imagePreview} alt="Preview" width="128" height="160" />
        </div>
      )}

      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
