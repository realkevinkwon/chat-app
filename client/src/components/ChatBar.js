import React from 'react';

const ChatBar = ({ users }) => {
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