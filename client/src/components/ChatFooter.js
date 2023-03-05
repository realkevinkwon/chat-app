import React, { useState } from 'react';

const ChatFooter = ({ messages, setMessages, socket }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    const data = {
        text: message,
        name: sessionStorage.getItem('username'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
    }
    setMessages([...messages, data]);
    if (message.trim() && sessionStorage.getItem('username')) {
      socket.emit('message', data);
    }
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;