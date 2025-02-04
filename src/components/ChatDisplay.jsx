import React from 'react';

const ChatDisplay = ({ conversations }) => {
  return (
    <div className="chat-display">
      {conversations.map((msg, index) => {
        let bgColor = '';
        if (msg.text.includes('🚨')) {
          bgColor = '#52ff69';
        } else if (msg.text.includes('🤑')) {
          bgColor = '#ff8030';
        } else if (msg.text.includes('🤖')) {
          bgColor = '#ff0000';
        } else if (msg.text.includes('👋')) {
          bgColor = '#7adb67';
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
