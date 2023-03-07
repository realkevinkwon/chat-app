import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import ChatRooms from './ChatRooms';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatRooms />
      <div className="chat__main">
        <ChatBody
          messages={messages}
          typingStatus={typingStatus}
          setTypingStatus={setTypingStatus}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter
          socket={socket}
          messages={messages}
          setMessages={setMessages}
          setTypingStatus={setTypingStatus}
        />
      </div>
      <ChatBar socket={socket} />
    </div>
  );
};

export default ChatPage;