import React, { useEffect } from 'react';

const ChatBody = ({ messages, typingStatus, setTypingStatus, lastMessageRef }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypingStatus('');
    }, 5000);
    return () => clearTimeout(timeout);
  }, [typingStatus, setTypingStatus]);

  return (
    <div className="message__container">
      {messages.map((message) =>
        message.name === sessionStorage.getItem('username') ? (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </div>
        )
      )}

      <div className="message__status">
        <p>{typingStatus}</p>
      </div>

      <div ref={lastMessageRef} />
    </div>
  );
};

export default ChatBody;