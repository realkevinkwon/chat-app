import React, { useState, useEffect } from 'react';

const ChatBar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('newUserResponse', (data) => setUsers(data));
  }, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h4 className="chat__header">ACTIVE USERS</h4>
      <div className="chat__users">
        {users.map((user) => (
          <p key={user.socketID}>{user.username}</p>
        ))}
      </div>
    </div>
  );
};

export default ChatBar;