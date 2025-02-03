import React, { useState } from 'react';
import axios from 'axios';

const ChatInput = ({ addMessage }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() && !file && !url.trim()) return;

    // Check if the file is an image
    if (!message.trim() && file && !file.type.startsWith('image/')) {
      addMessage({ sender: 'api', text: 'Error: Only images can be sent without text.' });
      return;
    }

    // Add user's message to chat
    if (message.trim()) {
      addMessage({ sender: 'user', text: message });
    }

    if (file) {
      addMessage({ sender: 'user', text: 'Image uploaded!' });
    }

    if (url.trim()) {
      addMessage({ sender: 'user', text: 'Invoice URL received!' });
    }

    const formData = new FormData();
    formData.append('user_input', message);
    if (file) {
      formData.append('image_file', file);
    } else if (url.trim()) {
      formData.append('image_url', url);
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

      if (response.intent === 'create_expense') {
        addMessage({ sender: 'api', text: `🤑 Expense Created Successfully` });
      } else if (response.intent === 'search_by_fields') {
        addMessage({ sender: 'api', text: `General Search Result: 🚨 ${response.result}` });
      } else if (response.intent === 'sum_expense') {
        addMessage({ sender: 'api', text: `Summed category expense: 🚨 ${response.result}` });
      } else if (response.intent === 'min_max_expense') {
        addMessage({ sender: 'api', text: `Min/Max category expense: 🚨 ${response.result}` });
      } else if (response.intent === 'monthly_expense_summary') {
        addMessage({ sender: 'api', text: `Monthly expense summary: 🚨 ${response.result}` });
      } else if (response.intent === 'average_expense') {
        addMessage({ sender: 'api', text: `Average expense by category: 🚨 ${response.result}` });
      } else if (response.intent === 'expense_anomalies') {
        addMessage({ sender: 'api', text: `Abnormal expenses: 🚨 ${response.result}` });
      } else if (response.intent === 'recurring_expenses') {
        addMessage({ sender: 'api', text: `Recurring expenses: 🚨 ${response.result}` });
      } else if (response.intent === 'check_budget') {
        addMessage({ sender: 'api', text: `Budget check result: 🚨 ${response.result}` });
      } else if (response.intent === 'daterange_all_expenses') {
        addMessage({ sender: 'api', text: `All expenses in date range: 🚨 ${response.result}` });
      } else if (response.intent === 'daterange_category_expenses') {
        addMessage({ sender: 'api', text: `All expenses of category in date range: 🚨 ${response.result}` });
      } else if (response.intent === 'highest_expense') {
        addMessage({ sender: 'api', text: `Highest expense: 🚨 ${response.result}` });
      } else if (response.intent === 'lowest_expense') {
        addMessage({ sender: 'api', text: `Lowest expense: 🚨 ${response.result}` });
      } else if (response.intent === 'category_percentage') {
        addMessage({ sender: 'api', text: `Category percentage: 🚨 ${response.result}` });
      } else if (response.intent === 'yearly_expense_summary') {
        addMessage({ sender: 'api', text: `Yearly expense summary: 🚨 ${response.result}` });
      } else if (response.intent === 'expense_trends') {
        addMessage({ sender: 'api', text: `Monthly expense summary: 🚨 ${response.result}` });
      } else if (response.intent === 'predict_future_expenses') {
        addMessage({ sender: 'api', text: `Future expense prediction: 🚨 ${response.result}` });
      } else if (response.intent === 'compare_periods_expenses') {
        addMessage({ sender: 'api', text: `Expense comparison: 🚨 ${response.result}` });
      }
      else if (response.intent === 'unknown') {
        addMessage({ sender: 'api', text: `🤖 I'm sorry, I don't understand. Please try again.` });
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage({ sender: 'api', text: 'Error: Could not process your request.' });
    }

    setMessage('');
    setFile(null);
    setUrl('');
  };

  // Handler for the new GET button
  const handleGet = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      console.log('GET Response:', response.data);
      addMessage({ sender: 'user', text: 'GET request successful!' });
    } catch (error) {
      console.error('GET Error:', error);
      addMessage({ sender: 'user', text: 'Error: GET request failed.' });
    }
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
        required={!file && !url.trim()}
      />

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste an image URL..."
        required={!file && !message.trim()}
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

      {/* New small GET button */}
      <button
        type="button"
        onClick={handleGet}
        style={{
          marginLeft: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          backgroundColor: '#FFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        🏗️
      </button>
    </form>
  );
};

export default ChatInput;
