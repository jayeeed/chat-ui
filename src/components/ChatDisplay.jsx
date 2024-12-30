import React from 'react';

const ChatDisplay = ({ conversations }) => {
  return (
    <div className="chat-display">
      {conversations.map((msg, index) => {
        let bgColor = '';
        if (msg.text.includes('search')) {
          bgColor = 'yellow';
        } else if (msg.text.includes('save')) {
          bgColor = 'green';
        }

        return (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'user' ? 'user' : 'api'}`}
            style={{ backgroundColor: bgColor }}
          >
            <p>{msg.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatDisplay;
