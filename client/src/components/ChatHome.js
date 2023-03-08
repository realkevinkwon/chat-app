import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatHome = ({ socket }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // Add user and redirect to chat page.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length !== 0) {
      sessionStorage.setItem('username', username);
      socket.emit('newUser', { username, socketID: socket.id });
      navigate('/chat');
    }
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to open chat</h2>
      <label htmlFor="username">Username</label>
      {/* Text field for entering username. */}
      <input
        type="text"
        name="username"
        id="username"
        className="username__input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit" className="home__cta">SIGN IN</button>
    </form>
  );
}

export default ChatHome;